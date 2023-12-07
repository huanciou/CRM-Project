import mongoose from 'mongoose';

const connections = {};
const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER } = process.env;

const connectionOptions = {
  socketTimeoutMS: 3600000, // 3600ms * 1000
};

export default function connectDB(dbToken) {
  return new Promise((resolve, reject) => {
    if (!connections[dbToken]) {
      const dbUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}${dbToken}`;
      const connection = mongoose.createConnection(dbUri, connectionOptions);

      connection.on('connected', () => {
        console.log(`Connected to the db: ${dbToken}`);
        connections[dbToken] = connection;
        resolve(connection);
      });

      connection.on('error', (err) => {
        console.error('Connect Failed:', err);
        reject(err);
      });
    } else {
      resolve(connections[dbToken]);
    }
  });
}
