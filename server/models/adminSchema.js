import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: 'admin',
  },
  campaign: {
    type: String,
  },
});

export default adminSchema;
