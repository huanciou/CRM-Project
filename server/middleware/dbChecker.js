export function dbChecker(req, res, next) {
  const { dbToken } = req.cookies;
  console.log(`dbChecker: ${dbToken}`);
  req.dbToken = dbToken;
  next();
}

export function dbCheckerInHeaders(req, res, next) {
  const dbToken = req.get('dbToken');
  req.dbToken = dbToken;
  next();
}
