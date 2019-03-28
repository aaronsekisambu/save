import { isCelebrate } from 'celebrate';

const joiErrors = (err, req, res, next) => {
  if (!isCelebrate(err)) return next(err);
  const errors = [];
  err.details.forEach((error) => {
    errors.push(error.message.split('"').join(''));
  });
  return res.status(400).json({
    status: res.statusCode,
    error: errors,
  });
};

export default joiErrors;
