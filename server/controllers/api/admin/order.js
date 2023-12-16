import getModels from '../../../models/modelHelper.js';

export async function createOrder(req, res) {
  const { dbToken } = req;
  const { order } = await getModels(dbToken);

  const orderItems = req.body;
  console.log(orderItems);
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

export async function fetchDashboard(req, res) {
  const { dbToken } = req;
  const { startDate, endDate } = req.body;
  const { checkout } = await getModels(dbToken);
  const resData = {};

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);

  try {
    const checkoutAmountByDay = await checkout.aggregate([
      {
        $match: {
          checkout_Time: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$checkout_Time' },
            month: { $month: '$checkout_Time' },
            day: { $dayOfMonth: '$checkout_Time' },
          },
          totalAmount: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month',
                  day: '$_id.day',
                },
              },
            },
          },
          amount: '$totalAmount',
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
    resData.checkoutAmountByDay = checkoutAmountByDay;
  } catch (err) {
    return res.status(500).send('checkoutAmountByDay error');
  }

  try {
    const checkoutTags = await checkout.aggregate([
      {
        $match: {
          checkout_Time: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $unwind: '$order_Items',
      },
      {
        $match: {
          'order_Items.tags': { $ne: null },
        },
      },
      {
        $group: {
          _id: '$order_Items.tags',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1, // 降冪
        },
      },
    ]);
    resData.checkoutTags = checkoutTags;
  } catch (err) {
    return res.status(500).send('checkoutTags error');
  }

  try {
    const checkoutIDs = await checkout.aggregate([
      {
        $match: {
          checkout_Time: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $match: {
          customer_ID: { $ne: null },
        },
      },
      {
        $group: {
          _id: '$customer_ID',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1, // 降冪
        },
      },
    ]);
    resData.checkoutIDs = checkoutIDs;
  } catch (err) {
    return res.status(500).send('checkoutTags error');
  }
  res.json(resData);
}
