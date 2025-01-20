import bcrypt from 'bcryptjs';
import Admin from '@/Model/admin'; // Ensure this path is correct
import dbConnect from '@/lib/mongodb';

const createAdmins = async (req, res) => {
  if (req.method === 'POST') {
    await dbConnect();  // Ensure MongoDB is connected

    const admins = [
      { email: 'admin1@example.com', password: 'admin123', username: 'Admin 1' },
      { email: 'admin2@example.com', password: 'admin456', username: 'Admin 2' },
      { email: 'admin3@example.com', password: 'admin789', username: 'Admin 3' },
      { email: 'admin4@example.com', password: 'admin101112', username: 'Admin 4' },
      { email: 'rida@gmail.com', password: '123456', username: 'Rida Zaidi' }
    ];

    for (const admin of admins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      const newAdmin = new Admin({
        email: admin.email,
        password: hashedPassword,
        username: admin.username
      });

      try {
        await newAdmin.save();
        console.log(`Admin created: ${admin.email}`);
      } catch (error) {
        console.error(`Error creating admin ${admin.email}:`, error);
        return res.status(500).json({ message: `Error creating admin ${admin.email}` });
      }
    }

    res.status(200).json({ message: 'Admins created successfully.' });
  } else {
    // Only allow POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default createAdmins;
