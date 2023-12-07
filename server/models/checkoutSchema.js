import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
  customer_ID: {
    type: Number,
  },
  order_ID: {
    type: String,
    required: true,
  },
  checkout_Time: {
    type: Date,
  },
  order_Items: [],
  payment_Method: {
    type: String,
  },
  employee_ID: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  checkout_Status: {
    type: String,
    default: 'Unpaid',
  },
});

checkoutSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (!update.$setOnInsert) {
    update.$setOnInsert = {};
  }
  if (!update.$setOnInsert.checkout_Time) {
    update.$setOnInsert.checkout_Time = new Date();
  }
  next();
});

export default checkoutSchema;
