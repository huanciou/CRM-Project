import getModels from '../../../models/modelHelper.js';

export default async function postSetup(req, res) {
  const { name, location, phone, credits, campaign } = req.body;
  const { dbToken } = req;
  const { setup } = await getModels(dbToken);

  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (location !== undefined) updateData.location = location;
  if (phone !== undefined) updateData.phone = phone;
  if (credits !== undefined) updateData.credits = credits;
  if (campaign !== undefined) updateData.campaign = campaign;

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
  res.send('ok');
}
