import { menuSetup, menu } from '../../../models/menuSchema.js';
import imgUpload from '../../../utils/s3Bucket.js';

export async function createMenuCategory(req, res) {
  const { category } = req.body;
  await menuSetup.create({ category });
  res.send('ok');
}

export async function createMenuContent(req, res) {
  const data = await imgUpload(req);
  await menu.create(data);
  res.send('ok');
}

export async function deleteMenuCategory(req, res) {
  const { id } = req.body;
  const data = await menuSetup.deleteOne({ _id: id });
  res.send(data.acknowledged);
}

export async function deleteMenuContent(req, res) {
  const { id } = req.body;
  const data = await menu.deleteOne({ _id: id });
  res.send(data.acknowledged);
}

export async function getMenuByCategories(req, res) {
  const menus = await menu.aggregate([
    {
      $group: {
        _id: '$category',
        data: { $push: '$$ROOT' },
      },
    },
  ]);
  res.json(menus);
}
