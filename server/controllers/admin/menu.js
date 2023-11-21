import { menuSetup, menu } from '../../models/menuSchema.js';

export async function getMenuSetup(req, res) {
  const documents = await menuSetup.find();

  if (documents) {
    const categories = documents.map((doc) => doc.category);
    return res.render('admin/menu', { categories });
  }
  return res.render('admin/menu');
}

export async function getMenuEdition(req, res) {
  const data = await menuSetup.find();
  res.json(data);
}

export async function getMenu(req, res) {
  const data = await menu.find();
  res.json(data);
}
