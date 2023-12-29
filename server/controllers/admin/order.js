import path from 'path';

export function getOrder(req, res) {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}

export function getDashboard(req, res) {
  const build = path.resolve('public', 'build');
  res.sendFile(path.join(build, 'index.html'));
}
