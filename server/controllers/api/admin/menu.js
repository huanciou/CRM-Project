import getModels from '../../../models/modelHelper.js';
import imgUpload from '../../../utils/s3Bucket.js';

export async function createMenuCategory(req, res) {
  const { dbToken } = req;
  const { menuSetup } = await getModels(dbToken);
  const { category } = req.body;

  await menuSetup.create({ category });
  res.redirect('/admin/menuSetup');
}

export async function createMenuTags(req, res) {
  const { dbToken } = req;
  const { tags } = await getModels(dbToken);
  const { tag } = req.body;
  console.log(`doToken5: ${dbToken}`);

  await tags.create({ tags: tag });
  res.redirect('/admin/menuSetup');
}

export async function createMenuContents(req, res) {
  const { dbToken } = req;
  const { menu } = await getModels(dbToken);
  const data = await imgUpload(req);
  await menu.create(data);
  res.send('ok');
}

export async function fetchMenuCategories(req, res) {
  const { dbToken } = req;
  const { menuSetup } = await getModels(dbToken);
  const data = await menuSetup.find();
  res.json(data);
}

export async function fetchMenuTags(req, res) {
  const { dbToken } = req;
  const { tags } = await getModels(dbToken);
  console.log(`doToken6: ${dbToken}`);
  const data = await tags.find();
  console.log(`doToken7: ${dbToken}`);
  res.json(data);
}

export async function deleteMenuCategory(req, res) {
  const { dbToken } = req;
  const { menuSetup } = await getModels(dbToken);
  const { id } = req.body;
  const data = await menuSetup.deleteOne({ _id: id });
  res.send(data.acknowledged);
}

export async function deleteMenuTag(req, res) {
  const { dbToken } = req;
  const { tags } = await getModels(dbToken);
  const { id } = req.body;
  const data = await tags.deleteOne({ _id: id });
  res.send(data.acknowledged);
}

export async function deleteMenuContent(req, res) {
  const { dbToken } = req;
  const { menu } = await getModels(dbToken);
  const { id } = req.body;
  const data = await menu.deleteOne({ _id: id });
  res.send(data.acknowledged);
}

export async function fetchMenuByCategories(req, res) {
  const { dbToken } = req;
  const { menu } = await getModels(dbToken);
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
