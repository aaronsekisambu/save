import Validate from 'celebrate';

const checkUserId = {
  params: {
    id: Validate.Joi.string().uuid().required().trim(),
  },
};

const userSignup = {
  body: {
    email: Validate.Joi.string().email().required(),
    password: Validate.Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  },
};

const userLogin = {
  body: {
    email: Validate.Joi.string().email().required(),
    password: Validate.Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  },
};

export default {
  dcheckUserId,
  userSignup,
  userLogin,
};
