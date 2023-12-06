import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  credits: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  campaign: {
    type: String,
    default: 'Null',
  },
  update_time: {
    type: Date,
  },
});

setupSchema.pre('save', function (next) {
  if (!this.update_time) {
    this.update_time = this._id.getTimestamp();
  }
  next();
});
const setup = mongoose.model('Setup', setupSchema);

export default setup;
