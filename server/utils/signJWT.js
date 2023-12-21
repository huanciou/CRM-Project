import jwt from 'jsonwebtoken';

const { JWT_KEY } = process.env;

function signJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export default signJWT;
