// pages/api/auth/forgot-password.js
import {dbConnect} from '../../../lib/dbConnect';
import User from '../../../models/User';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      return res.status(200).json({ message: 'If the email exists, an OTP has been sent' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetToken = otp.toString();
    user.resetTokenExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - AgroCare',
      html: `<h2>Password Reset OTP</h2><p>Your OTP: <strong>${otp}</strong></p><p>Expires in 10 minutes.</p>`
    });

    res.status(200).json({ message: 'OTP sent', email });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

