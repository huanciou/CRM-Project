import mongoose from 'mongoose';

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER } = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}`,
    {},
  )
  .then(() => {
    console.log('Connect to MongoDB');
  })
  .catch((err) => {
    console.log('Connection Failed: ', err);
  });
