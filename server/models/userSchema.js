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
  picture: {
    type: String,
    default: 'Null',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  history: [
    {
      id: {
        type: String,
        required: true,
      },
    },
  ],
  est_Time: {
    type: Date,
  },
});

userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (!update.$setOnInsert.est_Time) {
    update.$setOnInsert.est_Time = new Date();
  }
  next();
});

const user = mongoose.model('User', userSchema);

export default user;
