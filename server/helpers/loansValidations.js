import Validate from 'celebrate';

const payLoan = {
  body: {
    userId: Validate.Joi.string().required().trim(),
    loanId: Validate.Joi.string().required().trim(),
    guarantor: Validate.Joi.string().required().trim(),
    amount: Validate.Joi.string().required().trim(),
    paymentPeriod: Validate.Joi.string().required().trim(),
  }
}

export default {
  payLoan,
};