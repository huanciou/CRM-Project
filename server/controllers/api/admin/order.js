import { menu } from '../../../models/menuSchema.js';

async function createOrder(req, res) {
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

export default createOrder;
