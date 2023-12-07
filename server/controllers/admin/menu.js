import getModels from '../../models/modelHelper.js';

export async function getMenuSetup(req, res) {
  const { dbToken } = req;
  const { menuSetup } = await getModels(dbToken);
  const documents = await menuSetup.find();

  if (documents) {
    const categories = documents.map((doc) => doc.category);
    return res.render('admin/menu', { categories });
  }
  return res.render('admin/menu');
}

export async function getMenu(req, res) {
  const { dbToken } = req;
  const { menu } = await getModels(dbToken);
  const data = await menu.find();
  res.json(data);
}
