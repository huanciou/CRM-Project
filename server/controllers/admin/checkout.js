import path from 'path';
import getModels from '../../models/modelHelper.js';

export function getCheckout(req, res) {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}

export async function getCheckoutByID(req, res) {
  const { dbToken } = req;
  const { order, checkout } = await getModels(dbToken);
  const { id } = req.params;

  try {
    const data = await order.findById(id);

    const amount = data.order_Items.reduce(
      (acc, index) => (acc += index.amount),
      0,
    );

    const checkoutList = {
      order_ID: id,
      order_Items: data.order_Items,
      amount,
    };

    try {
      const checkoutID = await checkout.findOneAndUpdate(
        { _id: id },
        { $setOnInsert: checkoutList },
        { upsert: true, new: true },
      );
    } catch (err) {
      console.error(err.message);
    }

    return res.render('admin/checkoutByID', { id, amount, data });
  } catch (err) {
    return res.status(404).send(err);
  }
}
