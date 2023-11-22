import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
  customer_ID: {
    type: Number,
    required: true,
  },
  checkout_Time: {
    type: Date,
  },
  item_Detail: [],
  payment_Method: {
    type: String,
    required: true,
  },
  employee_ID: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  checkout_Status: {
    type: String,
    defalut: 'Unpaid',
  },
});

checkoutSchema.pre('save', function (next) {
  if (!this.checkout_Time) {
    this.checkout_Time = this._id.getTimestamp();
  }
  next();
});

const checkout = mongoose.model('Checkout', checkoutSchema);

export default checkout;
