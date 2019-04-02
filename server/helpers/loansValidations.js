import Validate from 'celebrate';

const payLoan = {
  body: {
    userId: Validate.Joi.string().uuid().required().trim(),
    amount: Validate.Joi.number().required(),
    transactionDate: Validate.Joi.date().required(),
    transactionCode: Validate.Joi.string().required().trim(),
    comment: Validate.Joi.string().required().trim(),
  },
  params: {
    id: Validate.Joi.string().uuid().required().trim(),
  },
};

// validating the requesting loan endpoint
const requestLoan = {
  body: {
    userId: Validate.Joi.string().uuid().required().trim(),
    guarantor: Validate.Joi.string().required().trim(),
    amount: Validate.Joi.number().required(),
    paymentPeriod: Validate.Joi.number().required(),
  },
};

const approveLoan = {
  body: {
    loanStatus: Validate.Joi.string().trim(),
  },
};

const checkLoanStatus = {
  body: {
    userId: Validate.Joi.string().uuid().required().trim(),
    loanId: Validate.Joi.string().uuid().required().trim(),
  },
};

export default {
  payLoan,
  requestLoan,
  approveLoan,
  checkLoanStatus,
};
