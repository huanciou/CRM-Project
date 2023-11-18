import mongoose from 'mongoose';

const menuSetupSchema = new mongoose.Schema({
  category: [
    {
      type: String,
      required: false,
    },
  ],
});

const menuSchema = new mongoose.Schema({
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
  images: {
    type: String,
    required: false,
  },
});

export const menu = mongoose.model('Manu', menuSchema);
export const menuSetup = mongoose.model('ManuSetup', menuSetupSchema);
