import verifyJWT from '../utils/verifyJWT.js';

async function authentication(req, res, next) {
  const headers = req.get('Authorization');
  const token =
    headers?.replace('Bearer ', '') ||
    req.cookies.jwtToken ||
    req.cookies.adminToken;

  if (!token) {
    return res.status(401).send('401 Unauthenticated');
  }

  try {
    await verifyJWT(token);
    next();
  } catch (err) {
    return res.status(403).send('403 Unauthorized: Invalid token');
  }
}

export default authentication;
