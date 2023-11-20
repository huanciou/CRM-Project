import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer_ID: {
    type: String,
    required: true,
  },
  order_Items: [
    {
      item_ID: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
      },
    },
  ],
  requests: {
    type: String,
    default: 'Null',
  },
  order_Time: {
    type: Date,
  },
});

orderSchema.pre('save', function (next) {
  if (!this.order_Time) {
    this.order_Time = this._id.getTimestamp();
  }
  next();
});

const order = mongoose.model('Order', orderSchema);

export default order;
