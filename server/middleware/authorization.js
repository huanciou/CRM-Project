import verifyJWT from '../utils/verifyJWT.js';

async function authorization(req, res, next) {
  try {
    const headers = req.get('Authorization');
    const token = headers?.replace('Bearer ', '');

    const payload = await verifyJWT(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).send('403 Unauthorized: Invalid token');
  }
}

export default authorization;
