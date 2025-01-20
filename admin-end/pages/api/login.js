import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import Admin from '@/Model/admin';
import dbConnect from '@/lib/mongodb';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    await dbConnect();

    // Find the admin by email (case-insensitive)
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, email: admin.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 60 * 60, 
      path: '/', 
    }));

    // Send the admin details as part of the response
    return res.status(200).json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        email: admin.email,
        username: admin.username
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default handler;