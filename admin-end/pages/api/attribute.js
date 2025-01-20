import dbConnect from '@/lib/mongodb';
import Attribute from '@/Model/attribute'; // Ensure this path is correct

const attributesHandler = async (req, res) => {
  await dbConnect(); // Ensure MongoDB is connected
  const { method } = req;

  switch (method) {
    case 'POST': {
      const attributes = [
        { name: 'age', type: 'number' },
        { name: 'gender', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'userType', type: 'string' }
      ];

      for (const attribute of attributes) {
        const newAttribute = new Attribute({
          name: attribute.name,
          type: attribute.type
        });

        try {
          await newAttribute.save();
          console.log(`Attribute created: ${attribute.name}`);
        } catch (error) {
          console.error(`Error creating attribute ${attribute.name}:`, error);
          return res.status(500).json({ message: `Error creating attribute ${attribute.name}` });
        }
      }

      return res.status(200).json({ message: 'Attributes created successfully.' });
    }

    case 'GET': {
      try {
        const attributes = await Attribute.find(); // Fetch all attributes from the database
        return res.status(200).json({ success: true, data: attributes });
      } catch (error) {
        console.error('Error fetching attributes:', error);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
    }
  }
};

export default attributesHandler;