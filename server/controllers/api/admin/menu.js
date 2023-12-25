import getModels from '../../../models/modelHelper.js';
import imgUpload from '../../../utils/s3Bucket.js';
import { ValidationError } from '../../../utils/errorHandler.js';

export async function createMenuCategory(req, res, next) {
  try {
    const { dbToken } = req;
    const { menuSetup } = await getModels(dbToken);
    const { category } = req.body;
    await menuSetup.create({ category });
    res.status(200).send('ok');
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function createMenuTags(req, res, next) {
  try {
    const { dbToken } = req;
    const { tags } = await getModels(dbToken);
    const { tag } = req.body;
    await tags.create({ tags: tag });
    res.status(200).send('ok');
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function createMenuContents(req, res, next) {
  try {
    const { dbToken } = req;
    const { menu } = await getModels(dbToken);
    const data = await imgUpload(req);
    await menu.create(data);
    res.status(200).send('ok');
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function fetchMenuCategories(req, res, next) {
  try {
    const { dbToken } = req;
    const { menuSetup } = await getModels(dbToken);
    const data = await menuSetup.find();
    res.json(data);
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function fetchMenuTags(req, res, next) {
  try {
    const { dbToken } = req;
    const { tags } = await getModels(dbToken);
    const data = await tags.find();
    res.json(data);
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function deleteMenuCategory(req, res, next) {
  try {
    const { dbToken } = req;
    const { menuSetup } = await getModels(dbToken);
    const { id } = req.body;
    const data = await menuSetup.deleteOne({ _id: id });
    res.send(data.acknowledged);
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function deleteMenuTag(req, res, next) {
  try {
    const { dbToken } = req;
    const { tags } = await getModels(dbToken);
    const { id } = req.body;
    const data = await tags.deleteOne({ _id: id });
    res.send(data.acknowledged);
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function deleteMenuContent(req, res, next) {
  try {
    const { dbToken } = req;
    const { menu } = await getModels(dbToken);
    const { id } = req.body;
    const data = await menu.deleteOne({ _id: id });
    res.send(data.acknowledged);
  } catch (err) {
    next(new Error('Internal Error'));
  }
}

export async function fetchMenuByCategories(req, res, next) {
  try {
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
  } catch (err) {
    next(new Error('Internal Error'));
  }
}
