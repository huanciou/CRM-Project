function authentication(req, res, next) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send('Permision Denied');
  }
  next();
}

export default authentication;
