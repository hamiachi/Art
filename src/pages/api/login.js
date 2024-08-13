import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

const secretKey = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await connectToDatabase();
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Create a token
      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

      res.status(200).json({
        token,
        decoded: { email: user.email }
      });
    } catch (error) {
      res.status(500).json({ message: 'System error, please try again later' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
