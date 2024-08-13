import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      await connectToDatabase();
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ name: user.username });
    } catch (error) {
      res.status(500).json({ message: 'System error, please try again later' });
    }
  } else {
    console.log('user ko ko tim dc r')
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}