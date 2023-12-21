import mongoose from 'mongoose';

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER } = process.env;

export default async function switchDatabases(databaseSign) {
  return mongoose
    .disconnect()
    .then(() => {
      console.log('Disconnected from the current database.');

      return mongoose.connect(
        `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}${databaseSign}`,
        {},
      );
    })
    .then(() => {
      console.log(`Connected to the ${databaseSign}`);
    })
    .catch((err) => {
      console.error('Connection error: ', err);
    });
}
