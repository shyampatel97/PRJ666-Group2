// pages/api/auth/verify-otp.js
import {dbConnect} from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, otp } = req.body;
  
  try {
    await dbConnect();
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      resetToken: otp,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified', verified: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

