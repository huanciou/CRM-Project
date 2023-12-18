import getModels from '../../../models/modelHelper.js';

export async function postSetup(req, res) {
  const { name, location, phone } = req.body;
  const { dbToken } = req;
  const { setup } = await getModels(dbToken);

  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (location !== undefined) updateData.location = location;
  if (phone !== undefined) updateData.phone = phone;

  try {
    if (Object.keys(updateData).length > 0) {
      const update = await setup.create(updateData);
      console.log(update);
    } else {
      console.log('No fields to update');
    }
  } catch (err) {
    res.status(404).send('Update Failed');
  }
  res.status(200).json({ message: 'success' });
}

export async function fetchSetup(req, res) {
  const { dbToken } = req;
  const { setup } = await getModels(dbToken);

  try {
    const setupProfile = await setup.findOne().sort({ update_time: -1 });
    if (setupProfile) {
      console.log(setupProfile);
      res.status(200).json(setupProfile);
    } else {
      res.status(404).json({ message: '404 Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: '500 Internal Error' });
  }
}
