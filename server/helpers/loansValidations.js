import Validate from 'celebrate';

const payLoan = {
  body: {
    userId: Validate.Joi.string().uuid().required().trim(),
    amount: Validate.Joi.number().required(),
    transactionDate: Validate.Joi.date().required(),
    transactionCode: Validate.Joi.string().required().trim(),
    comment: Validate.Joi.string().required().trim(),
  },
};

// validating the requesting loan endpoint
const requestLoan = {
  body: {
    userId: Validate.Joi.string().uuid().required().trim(),
    guarantor: Validate.Joi.string().required().trim(),
    amount: Validate.Joi.number().required(),
    interest: Validate.Joi.number(),
    totalAmount: Validate.Joi.number(),
    paymentPeriod: Validate.Joi.number(),
    loanStatus: Validate.Joi.string(),
    startdate: Validate.Joi.date(),
  },
};

const approveLoan = {
  body: {
    loanStatus: Validate.Joi.string().required().trim(),
  },
};

export default {
  payLoan,
  requestLoan,
  approveLoan,
};
