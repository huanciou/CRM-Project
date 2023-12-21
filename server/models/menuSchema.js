import mongoose from 'mongoose';

export const menuSetupSchema = new mongoose.Schema({
  category: {
    type: String,
    required: false,
    unique: true,
  },
});

export const tagsSetupSchema = new mongoose.Schema({
  tags: {
    type: String,
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
  tags: {
    type: String,
    default: 'Null',
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
