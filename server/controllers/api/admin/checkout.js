import axios from 'axios';
import getModels from '../../../models/modelHelper.js';
import verifyJWT from '../../../utils/verifyJWT.js';

const { LINE_PAY_CHANNEL_ID, LINE_PAY_CHANNEL_SERCRET } = process.env;

export async function postCheckout(req, res) {
  const { adminToken } = req.cookies;
  const { dbToken } = req;
  const { order, checkout, user } = await getModels(dbToken);

  if (!adminToken) {
    return res.status(401).send('Please Log-In again');
  }
  const payload = await verifyJWT(adminToken);

  const { type } = req.body;
  if (type === 'linepay') {
    const { orderId, userId, oneTimeKey, amount } = req.body;

    const linepayURL =
      'https://sandbox-api-pay.line.me/v2/payments/oneTimeKeys/pay';

    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelId': LINE_PAY_CHANNEL_ID,
      'X-LINE-ChannelSecret': LINE_PAY_CHANNEL_SERCRET,
      'X-LINE-MerchantDeviceType': 'POS',
    };

    const body = {
      productName: orderId,
      amount: Number(amount),
      currency: 'TWD',
      orderId,
      oneTimeKey,
    };

    try {
      const transaction = await axios.post(linepayURL, body, { headers });

      if (transaction.data.returnCode === '0000') {
        // order 改狀態
        try {
          const orderUpdated = await order.findOneAndUpdate(
            { _id: orderId },
            { $set: { isDeleted: true } },
            { new: true },
          );
          if (!orderUpdated) throw new Error('Order Not Found');
        } catch (err) {
          console.error(err.message);
        }

        // checkout 改狀態
        try {
          const checkoutUpdated = await checkout.findOneAndUpdate(
            { order_ID: orderId },
            { $set: { checkout_Status: 'Paid' } },
            { new: true },
          );
          if (!checkoutUpdated) throw new Error('Checkout Not Found');
        } catch (err) {
          console.error(err.message);
        }
        // user 加入 checkout id
        // user 加入 商家會員卡
        try {
          const userProfileUpdated = await user.findOneAndUpdate(
            { sub: userId },
            {
              $push: { history: orderId },
              $addToSet: { related: payload.name },
            },
            { new: true },
          );
          if (!userProfileUpdated) {
            throw new Error('User Profile Update Failed');
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.log(`trasnsaction faild: ${transaction.data.returnMessage}`);
      }
    } catch (err) {
      res.status(400).send('transaction failed');
    }

    res.send('1234');
  } else {
    res.send('123');
  }
}

export async function tmp(req, res) {
  res.send('test');
}
