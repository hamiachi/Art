// pages/api/register.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

const secretKey = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing information' });
    }

    try {
      await connectToDatabase();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('có lỗi')
        res.status(400).json({ message: 'Email already exists' });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1m' });
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);

        res.status(200).json({ message: 'Sign in complete', token, decoded});
      }
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'System error, please try again later' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Phương thức ${req.method} không được hỗ trợ`);
  }
}