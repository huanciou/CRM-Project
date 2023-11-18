import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const setup = mongoose.model('Setup', setupSchema);

export default setup;
