import Validate from 'celebrate';

const payLoan = {
  body: {
    userId: Validate.Joi.string().required().trim(),
    amount: Validate.Joi.number().required(),
    transactionDate: Validate.Joi.date().required(),
    transactionCode: Validate.Joi.string().required().trim(),
    comment: Validate.Joi.string().required().trim(),
  },
};

export default {
  payLoan,
};
