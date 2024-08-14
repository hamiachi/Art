import mongoose from 'mongoose';

const VerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  verificationCode: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: '10m' }, // Tự động xóa sau 10 phút
});

export default mongoose.models.Verification || mongoose.model('Verification', VerificationSchema);
