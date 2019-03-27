import { celebrate } from 'celebrate';

const joiErrors = (err, req, res, next) => {
  if (celebrate(err)) {
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