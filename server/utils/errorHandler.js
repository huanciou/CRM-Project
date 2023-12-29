export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'validationError';
  }
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ errors: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ errors: err.message });
  }
  return res.status(500).send('Oops, unknown error');
}
