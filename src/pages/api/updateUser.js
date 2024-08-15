import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, pic } = req.body;

    if (!email || !pic) {
      return res.status(400).json({ message: 'Missing information' });
    }

    try {
      await connectToDatabase();

      console.log(typeof(pic))
      console.log(pic)

    //   const updatedUser = await User.findOneAndUpdate(
    //     { email }, // Tìm người dùng với email
    //     { $push: { pics: pic } }, // Thêm phần tử mới vào mảng pics
    //     { new: true, upsert: true, runValidators: true } // Trả về tài liệu đã được cập nhật, tạo mới nếu không tồn tại
    //   );

    //   console.log(updatedUser)

    //   if (!updatedUser) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }

    async function addPicToUserByEmail(email, picObject) {
      try {
        const user = await User.findOneAndUpdate(
          { email }, // Điều kiện tìm kiếm
          { $push: { pics: picObject } }, // Cập nhật mảng pics
          { new: true } // Tùy chọn trả về tài liệu mới sau khi cập nhật
        );
    
        if (user) {
          console.log("Object đã được thêm vào mảng pics:", user.pics);
        } else {
          console.log("Không tìm thấy người dùng với email:", email);
        }
      } catch (error) {
        console.error("Lỗi khi thêm object vào mảng pics:", error);
      }
    }


      addPicToUserByEmail(email, pic);
      //res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'System error, please try again later' });
    }

    

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
