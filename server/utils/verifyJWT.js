import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

function verifyJWT() {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
    });
  });
}

export default verifyJWT;
