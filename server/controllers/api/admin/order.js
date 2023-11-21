import order from '../../../models/orderSchema.js';

export async function createOrder(req, res) {
  const orderItems = req.body;
  const orderList = {
    customer_ID: '0',
    order_Items: orderItems,
    requests: 'Null',
  };

  const orderResult = await order.create(orderList);
  console.log(orderResult);
  res.send('hi');
}

export async function fetchOrder(req, res) {
  const orderList = await order.find();
  console.log(orderList);
  res.json(orderList);
}
