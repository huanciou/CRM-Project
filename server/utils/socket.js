import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  return io;
};

export const getIo = () => {
  console.log(io);
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
