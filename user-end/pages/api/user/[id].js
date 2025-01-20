import dbConnect from '@/lib/mongodb';
import User from '@/Model/user';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {

  await dbConnect();
  if (req.method === 'GET') {
    const { id } = req.query; 
    // console.log("hereee" ,id);
  
    try {
      if (id) {
        // Fetch a specific user by ID
        const user = await User.findById(id);
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        return res.status(200).json({ user });
      } else {
        // Fetch all users if no ID is provided
        const users = await User.find();
        return res.status(200).json({ users });
      }
    } catch (error) {
      console.error('Error fetching user(s):', error);
      return res.status(500).json({ message: 'Error fetching user(s)' });
    }
  }
  
  // Handle unsupported methods
  return res.status(405).json({ message: 'Method Not Allowed' });
};

export default handler;
