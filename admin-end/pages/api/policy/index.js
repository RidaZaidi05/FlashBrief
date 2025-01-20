import dbConnect from "@/lib/mongodb";
import AccessPolicy from "@/Model/AccessPolicy";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {

    case 'POST':
      try {
        const { name, conditions, logicalOperators, negations } = req.body;

        if (!name || !conditions || conditions.length === 0) {
          return res.status(400).json({ success: false, message: 'name and conditions are required.' });
        }

        const accessPolicy = new AccessPolicy({
          name,
          conditions,
          logicalOperators,
          negations,
        });

        await accessPolicy.save();
        return res.status(201).json({ success: true, data: accessPolicy });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }


    case 'GET':
      try {
        const accessPolicies = await AccessPolicy.find();
        return res.status(200).json({ success: true, data: accessPolicies });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }

    // PUT: Update an existing access policy
    case 'PUT':
      try {
        const { id, name, conditions, logicalOperators, negations } = req.body;

        if (!id || !name || !conditions || conditions.length === 0) {
          return res.status(400).json({ success: false, message: 'ID, name, and conditions are required.' });
        }

        const updatedPolicy = await AccessPolicy.findByIdAndUpdate(
          id,
          { name, conditions, logicalOperators, negations },
          { new: true }
        );

        if (!updatedPolicy) {
          return res.status(404).json({ success: false, message: 'Access policy not found.' });
        }

        return res.status(200).json({ success: true, data: updatedPolicy });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }

    // DELETE: Delete an access policy by ID
    case 'DELETE':
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ success: false, message: 'ID is required.' });
        }

        const deletedPolicy = await AccessPolicy.findByIdAndDelete(id);

        if (!deletedPolicy) {
          return res.status(404).json({ success: false, message: 'Access policy not found.' });
        }

        return res.status(200).json({ success: true, message: 'Access policy deleted.' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      return res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
  }
}
