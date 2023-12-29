import verifyJWT from '../utils/verifyJWT.js';
import { ValidationError } from '../utils/errorHandler.js';

async function authentication(req, res, next) {
  const headers = req.get('Authorization');
  const token =
    headers?.replace('Bearer ', '') ||
    req.cookies.jwtToken ||
    req.cookies.adminToken;

  if (!token) {
    res.status(401).send('401 Unauthenticated');
    return;
  }

  try {
    await verifyJWT(token);
    next();
  } catch (err) {
    next(new ValidationError('Wrong JWT Token'));
  }
}

export default authentication;
