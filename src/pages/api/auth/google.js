import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      // Gửi token đến Google để xác thực
      const response = await axios.post('https://oauth2.googleapis.com/tokeninfo', null, {
        params: { id_token: token }
      });

      const { email, name } = response.data;

      // Xử lý và lưu thông tin người dùng vào cơ sở dữ liệu
      // Ví dụ: const user = await User.findOneAndUpdate({ email }, { name }, { upsert: true });

      // Tạo JWT token hoặc token tương tự để gửi cho client
      // const jwtToken = createJWTToken(user);

      // Trả về token cho client
      res.status(200).json({ token: 'your_jwt_token_here' });
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}