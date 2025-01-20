import dbConnect from '@/lib/mongodb';
import AccessPolicy from '@/Model/AccessPolicy';
import Resource from '@/Model/resource';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; 

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const resourcesUsingPolicy = await Resource.find({ policies: { $in: [id] } });

        if (resourcesUsingPolicy.length > 0) {
          return res.status(400).json({
            success: false,
            message: `Cannot delete policy. It's being used in ${resourcesUsingPolicy.length} resource(s). Please delete the resource(s) first.`,
          });
        }

        const deletedPolicy = await AccessPolicy.findByIdAndDelete(id);

        if (!deletedPolicy) {
          return res.status(404).json({
            success: false,
            message: 'Policy not found',
          });
        }

        res.status(200).json({
          success: true,
          message: 'Policy deleted successfully',
          data: deletedPolicy,
        });
        
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error while deleting policy',
          error: error.message,
        });
      }
      break;

    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}
