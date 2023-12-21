import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

export default verifyJWT;
