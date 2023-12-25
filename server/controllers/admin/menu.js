import path from 'path';
import getModels from '../../models/modelHelper.js';

export async function getMenuSetup(req, res) {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}

export async function getMenu(req, res, next) {
  try {
    const { dbToken } = req;
    const { menu } = await getModels(dbToken);
    const data = await menu.find();
    res.json(data);
  } catch (err) {
    next(new Error('Get Menu Failed'));
  }
}
