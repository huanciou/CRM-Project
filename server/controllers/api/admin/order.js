import getModels from '../../../models/modelHelper.js';

export async function createOrder(req, res) {
  const { dbToken } = req;
  const { order } = await getModels(dbToken);

  const orderItems = req.body;
  const orderList = {
    customer_ID: '0',
    order_Items: orderItems,
    requests: 'Null',
  };

  const orderResult = await order.create(orderList);
  res.send(orderResult._id);
}

export async function fetchOrder(req, res) {
  const { dbToken } = req;
  const { order } = await getModels(dbToken);
  const orderList = await order.find();
  res.json(orderList);
}

export async function deleteOrder(req, res) {
  const { dbToken } = req;
  const { order } = await getModels(dbToken);

  try {
    const { id } = req.body;
    await order.updateOne({ _id: id }, { isDeleted: true });

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(400).send('Order deleted failed');
  }
}
