import Validate from 'celebrate';

const save = {
  body: {
    userId: Validate.Joi.string().uuid().required().trim(),
    amount: Validate.Joi.number().required(),
    transactionCode: Validate.Joi.string().required().trim(),
    comment: Validate.Joi.string().required().trim(),
  },
};

export default {
  save,
};
