// pages/api/resource/[id].js
import Resource from "@/Model/resource";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deletedResource = await Resource.findByIdAndDelete(id);
      if (!deletedResource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }
      res.status(200).json({ success: true, data: deletedResource });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
