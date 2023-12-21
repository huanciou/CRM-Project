import path from 'path';
import getModels from '../../models/modelHelper.js';

export async function getMenuSetup(req, res) {
  const { dbToken } = req;
  console.log(`dbtoken: ${dbToken}`);
  // const { menuSetup, tags } = await getModels(dbToken);
  // const categories = await menuSetup.find();
  // const tag = await tags.find();
  // let cateArr;
  // let tagsArr;
  // console.log(`dbtoken2: ${dbToken}`);
  // if (categories) {
  //   cateArr = categories.map((doc) => doc.category);
  // }
  // if (tag) {
  //   tagsArr = tag.map((doc) => doc.tags);
  // }
  // console.log(`dbtoken3: ${dbToken}`);
  // return res.render('admin/menu', { cateArr, tagsArr });

  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}

export async function getMenu(req, res) {
  const { dbToken } = req;
  console.log(`doToken9: ${dbToken}`);
  const { menu } = await getModels(dbToken);
  const data = await menu.find();
  res.json(data);
}
