// pages/api/auth/reset-password.js
import { dbConnect } from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, newPassword } = req.body;
  
  try {
    await dbConnect();
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Session expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password_hash = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}