// lib/google-cloud-storage.js
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Sử dụng biến môi trường
  }); // Thay đổi thành bucket của bạn

  const bucketName = 'hamiachi';

// Hàm tải ảnh lên Google Cloud Storage
async function uploadImageToGCS(fileName, fileBuffer) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
        metadata: { contentType: 'image/jpeg' }
    });

    return file;
}

// Hàm tạo URL có thời hạn 30 ngày
async function generateSignedUrl(fileName) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 ngày
    });
    console.log("URL ảnh đã được đưa lên Google Cloud Storage:", url);
    return url;
}

module.exports = { uploadImageToGCS, generateSignedUrl };
