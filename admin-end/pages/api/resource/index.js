import dbConnect from "@/lib/mongodb";
import Resource from "@/Model/resource";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { title, content, publishedDate, policies, logicalOperators, negations } = req.body;
    
        if (!title || !content || !publishedDate) {
          return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
    
        const newResource = await Resource.create({
          title,
          content,
          publishedDate,
          policies: policies || [],
          logicalOperators: logicalOperators || [],
          negations: negations || [],
        });
        res.status(201).json({ success: true, data: newResource });
      } catch (error) {
        console.error('Error creating resource:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'GET':
      try {
        const resources = await Resource.find();
        res.status(200).json({ success: true, data: resources });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // UPDATE a Resource
    case 'PUT':
      try {
        const { id, title, content, publishedDate, policies, logicalOperators, negations } = req.body;

        if (!id || !title || !content || !publishedDate ) {
          return res.status(400).json({ success: false, message: 'Resource Detail are required.' });
        }

        const updatedResource = await Resource.findByIdAndUpdate(
          id,
          { title, content, publishedDate, policies: policies || [] , logicalOperators: logicalOperators || [] , negations: negations || [] },
          { new: true }
        );

        if (!updatedResource) {
          return res.status(404).json({ success: false, message: 'Resource not found.' });
        }

        return res.status(200).json({ success: true, data: updatedResource });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}