import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import User from '@/Model/user';
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

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.name, email: user.email }, 
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
      user: {
        id: user._id,
        email: user.email,
        username: user.name
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default handler;