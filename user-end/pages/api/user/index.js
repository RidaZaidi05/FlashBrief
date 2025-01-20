import dbConnect from '@/lib/mongodb';
import User from '@/Model/user';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {

  await dbConnect();
  if (req.method === 'POST') {
    const { name, email, password, age, gender, country, userType } = req.body;

    if(!name || !email || !password || !age || !gender || !country ){
        return res.status(404).json({ message: 'All Fields Required'});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      if (!userType){
        userType="Basic";
      }
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        country: country.toLowerCase(),
        userType,
      });

      await newUser.save();
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Error creating user' });
    }
  }

  if (req.method === 'GET') {
    try {
      const users = await User.find();
      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;  

    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true, 
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;  

    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user' });
    }
  }
  // Handle unsupported methods
  return res.status(405).json({ message: 'Method Not Allowed' });
};

export default handler;
