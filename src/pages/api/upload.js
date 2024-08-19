import { Storage } from '@google-cloud/storage';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { uploadImageToGCS, generateSignedUrl } from '@/lib/google-cloud-storage';
import { v4 as uuidv4 } from 'uuid';

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Sử dụng biến môi trường
});

const bucketName = 'hamiachi'; // Thay thế bằng tên bucket của bạn

// API route to handle file upload
export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to let formidable handle the request
  },
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the files:', err);
      return res.status(400).json({ error: 'Error parsing the files: ' + err.message });
    }

    try {
      const file = files.file[0]; // Lấy tệp đầu tiên từ danh sách tệp
      if (!file || file.size === 0) {
        return res.status(400).json({ error: 'Uploaded file is empty or not found' });
      }

      const filePath = file.filepath;
      const uniqueName = `${uuidv4()}}`;
      const fileName = `${uniqueName}`; // Tên của tệp trên Google Cloud Storage

      // Đọc dữ liệu tệp từ máy chủ
      const fileBuffer = fs.readFileSync(filePath);

      // Upload file to Google Cloud Storage
      await uploadImageToGCS(fileName, fileBuffer);

      // Generate a signed URL to access the uploaded file
      const url = await generateSignedUrl(fileName);

      // Delete the temporary file after successful upload
      fs.unlinkSync(filePath);

      return res.status(200).json({ url });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ error: 'Error uploading file: ' + error.message });
    }
  });
}
