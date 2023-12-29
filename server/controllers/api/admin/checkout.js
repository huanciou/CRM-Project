import axios from 'axios';
import getModels from '../../../models/modelHelper.js';

const { LINE_PAY_CHANNEL_ID, LINE_PAY_CHANNEL_SERCRET } = process.env;

export async function postCheckout(req, res, next) {
  try {
    const { dbToken } = req;
    const { order, checkout, user } = await getModels(dbToken);

    const { type } = req.body;
    if (type === 'LINE Pay') {
      await handleLinePay(req, res, order, checkout, user);
      return;
    }
    res.status(400).send('Something Went Wrong');
  } catch (err) {
    next(err);
  }
}

async function handleLinePay(req, res, order, checkout, user) {
  const { orderId, userId, oneTimeKey, amount, order_Items } = req.body;

  const linepayURL =
    'https://sandbox-api-pay.line.me/v2/payments/oneTimeKeys/pay';
  const headers = getLinePayHeaders();
  const body = getLinePayBody(orderId, oneTimeKey, amount);

  try {
    const transaction = await axios.post(linepayURL, body, { headers });
    console.log(`transaction.data.returnCode: ${transaction.data.returnCode}`);

    if (transaction.data.returnCode !== '0000') {
      return res.status(400).json({ message: transaction.data.returnMessage });
    }

    await updateOrderStatus(order, orderId);
    await updateCheckoutStatus(checkout, orderId, amount, userId, order_Items);
    await updateUserProfile(user, userId, amount);

    console.log('done');
    return res.status(200).send({ message: 'transaction successful' });
  } catch (err) {
    throw new Error('Handle Line Pay Failed');
  }
}

function getLinePayHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-LINE-ChannelId': LINE_PAY_CHANNEL_ID,
    'X-LINE-ChannelSecret': LINE_PAY_CHANNEL_SERCRET,
    'X-LINE-MerchantDeviceType': 'POS',
  };
}

function getLinePayBody(orderId, oneTimeKey, amount) {
  return {
    productName: orderId,
    amount: Number(amount),
    currency: 'TWD',
    orderId,
    oneTimeKey,
  };
}

async function updateOrderStatus(order, orderId) {
  try {
    const orderUpdated = await order.findOneAndUpdate(
      { _id: orderId },
      { $set: { isDeleted: true } },
      { new: true },
    );
  } catch (err) {
    throw new Error('Order Not Found');
  }
}

async function updateCheckoutStatus(
  checkout,
  orderId,
  amount,
  userId,
  order_Items,
) {
  try {
    const checkoutUpdated = await checkout.findOneAndUpdate(
      { _id: orderId },
      {
        $setOnInsert: {
          _id: orderId,
          amount,
          checkout_Status: 'Paid',
          order_ID: orderId,
          order_Items,
          customer_ID: userId,
        },
        $set: {},
      },
      { new: true, upsert: true },
    );
  } catch (err) {
    throw new Error('Error creating/updating checkout');
  }
}

async function updateUserProfile(user, userId, amount) {
  try {
    const pointsToAdd = Math.floor(amount / 100);
    const userProfileUpdated = await user.findOneAndUpdate(
      { sub: userId },
      { $inc: { credits: pointsToAdd } },
      { new: true },
    );
  } catch (err) {
    throw new Error('User not found or Profile Update Failed');
  }
}

export async function tmp(req, res) {
  res.send('test');
}
