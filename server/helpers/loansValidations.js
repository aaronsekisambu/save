import Validate from 'celebrate';

const payLoan = {
  body: {
    userId: Validate.Joi.string().required().trim(),
    amount: Validate.Joi.string().required().trim(),
    transactionDate: Validate.Joi.string().required().trim(),
    transactionCode: Validate.Joi.string().required().trim(),
    comment: Validate.Joi.string().required().trim(),
  },
};

export default {
  payLoan,
};
