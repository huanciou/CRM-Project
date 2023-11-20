import { menuSetup, menu } from '../../models/menuSchema.js';
import imgUpload from '../../utils/s3Bucket.js';

export async function getMenuSetup(req, res) {
  const documents = await menuSetup.find();

  if (documents) {
    const categories = documents.map((doc) => doc.category);
    return res.render('admin/menu', { categories });
  }
  return res.render('admin/menu');
}

export async function postMenuSetup(req, res) {
  const { category } = req.body;
  await menuSetup.create({ category });
  res.send('ok');
}

export async function getMenuEdition(req, res) {
  const data = await menuSetup.find();
  res.json(data);
}

export async function postMenuEdition(req, res) {
  const data = await imgUpload(req);
  await menu.create(data);
  res.send('ok');
}

export async function postDeleteMeunCategory(req, res) {
  const { id } = req.body;
  const data = await menuSetup.deleteOne({ _id: id });
  res.send(data.acknowledged);
}

export async function getMenu(req, res) {
  const data = await menu.find();
  // console.log(data);
  res.json(data);
}

export async function postMenu(req, res) {
  const { id } = req.body;
  console.log(id);
  const data = await menu.deleteOne({ _id: id });
  console.log(data.acknowledged);
  res.send(data.acknowledged);
}
