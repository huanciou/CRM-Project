import getModels from '../../../models/modelHelper.js';
import { getIo } from '../../../utils/socket.js';
import { ValidationError } from '../../../utils/errorHandler.js';

export async function createOrder(req, res, next) {
  try {
    const { dbToken } = req;
    const { order } = await getModels(dbToken);

    const orderItems = req.body;
    const io = getIo();

    const orderResult = await order.create(orderItems);
    if (orderResult._id) {
      io.emit(dbToken, 'orderCreated');
      console.log(`socket${dbToken}`);
    }
    res.send(orderResult);
  } catch (err) {
    next(new ValidationError('Create Order Failed'));
  }
}

export async function fetchOrder(req, res) {
  const { dbToken } = req;
  const { order } = await getModels(dbToken);
  const orderList = await order.find();
  res.json(orderList);
}

export async function deleteOrder(req, res, next) {
  try {
    const { dbToken } = req;
    const { order } = await getModels(dbToken);
    const { id } = req.body;
    await order.updateOne({ _id: id }, { isDeleted: true });
    res.json({ message: 'Order Deleted Successfully' });
  } catch (err) {
    next(new Error('Order Deleted Failed'));
  }
}

export async function fetchDashboard(req, res, next) {
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
    next(new Error('checkoutAmountByDay error'));
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
    next(new Error('checkoutTags error'));
  }

  try {
    const checkoutIDs = await checkout.aggregate([
      {
        $match: {
          checkout_Time: {
            $gte: start,
            $lte: end,
          },
          customer_ID: { $ne: null },
        },
      },
      {
        $group: {
          _id: '$customer_ID',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, // 降冪
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'sub',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          _id: 0,
          name: '$userDetails.name',
          count: 1,
        },
      },
    ]);

    resData.checkoutIDs = checkoutIDs;
  } catch (err) {
    next(new Error('checkoutTags error'));
  }

  res.json(resData);
}
