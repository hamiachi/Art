import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';
import Verification from '../../models/Verification'; // Tạo một model mới để lưu mã xác minh

const secretKey = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing information' });
    }

    try {
      console.log('Connecting to database...');
      await connectToDatabase();
      console.log('Connected to MongoDB');

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase(); // Tạo mã xác minh

        // Gửi email chứa mã xác minh
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your Verification Code',
          text: `Your verification code is: ${verificationCode}`,
        };
        
        console.log('Sending email...');
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(`log0 ${error}`)
            return res.status(500).json({ message: 'Failed to send verification email' });
          }
          console.log('Email sent successfully.');
          // Lưu mã xác minh vào cơ sở dữ liệu tạm thời
          const hashedPassword = await bcrypt.hash(password, 10);
          const verificationEntry = new Verification({
            email,
            username,
            password: hashedPassword,
            verificationCode,
            createdAt: new Date(),
          });
          await verificationEntry.save();
          console.log('User saved successfully.');

          res.status(200).json({ message: 'Verification email sent, please check your email' });
        });
      }
    } catch (error) {
      console.log(`log1 ${error}`)
      res.status(500).json({ message: 'System error, please try again later' });
    }
  } else if (req.method === 'PUT') {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ message: 'Missing information' });
    }

    try {
      await connectToDatabase();

      const verificationEntry = await Verification.findOne({ email });

      if (!verificationEntry) {
        return res.status(400).json({ message: 'Verification code expired or not found' });
      }

      if (verificationEntry.verificationCode !== verificationCode) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }

      // Lưu thông tin người dùng vào MongoDB
      const newUser = new User({
        username: verificationEntry.username,
        email: verificationEntry.email,
        password: verificationEntry.password,
      });
      await newUser.save();

      // Xóa thông tin xác minh sau khi thành công
      await Verification.deleteOne({ email });

      const token = jwt.sign({ email }, secretKey, { expiresIn: '1m' });

      res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.log(`log2 ${error}`)
      res.status(500).json({ message: 'System error, please try again later' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Phương thức ${req.method} không được hỗ trợ`);
  }
}
