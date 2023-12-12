import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 1000,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
  },
  history: [],
  related: [],
  est_Time: {
    type: Date,
  },
});

userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (!update.$setOnInsert) {
    update.$setOnInsert = {};
  }
  if (!update.$setOnInsert.est_Time) {
    update.$setOnInsert.est_Time = new Date();
  }
  next();
});

export default userSchema;
