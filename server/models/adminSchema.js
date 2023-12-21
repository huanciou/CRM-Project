import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    default: 'https://d3nexs9enmvorf.cloudfront.net/output.webp',
  },
  heading: {
    type: String,
    default: 'null',
  },
});
export default adminSchema;
