import { isCelebrate } from 'celebrate';

const joiErrors = (err, req, res, next) => {
  if (isCelebrate(err)) {
    const errors = [];
    err.details.forEach(error => {
      errors.push(error.message.split('"').join(''));
    });
    return res.status(400).send({
      status: res.statusCode,
      data: errors
    });
  }
  next();
};

export default joiErrors;