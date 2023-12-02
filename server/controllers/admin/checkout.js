import order from '../../models/orderSchema.js';

export function getCheckout(req, res) {
  res.render('admin/checkout');
}

export async function getCheckoutByID(req, res) {
  const { id } = req.params;
  try {
    const data = await order.findById(id);

    const orderList = data.order_Items;
    const total = orderList.reduce((acc, index) => {
      return (acc += index.amount);
    }, 0);
    console.log(total);

    return res.send(`total = ${total}`);
  } catch (err) {
    return res.status(404).send('id not exist');
  }
}
