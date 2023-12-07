import mongoose from 'mongoose';

export const menuSetupSchema = new mongoose.Schema({
  category: {
    type: String,
    required: false,
    unique: true,
  },
});

export const menuSchema = new mongoose.Schema({
  category: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  story: {
    type: String,
    required: false,
  },
  main_image: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
});
