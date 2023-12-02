import order from '../../../models/orderSchema.js';

export async function createOrder(req, res) {
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
  const orderList = await order.find();
  res.json(orderList);
}

export async function deleteOrder(req, res) {
  try {
    const { id } = req.body;
    const result = await order.updateOne({ _id: id }, { isDeleted: true });

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(400).send('Order deleted failed');
  }
}
