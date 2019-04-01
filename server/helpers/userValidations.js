import Validate from 'celebrate';

const userSignup = {
  body: {
    password: Validate.Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  },
};

const userLogin = {
  body: {
    email: Validate.Joi.string().required(),
    password: Validate.Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  },
};

export default {
  userSignup,
  userLogin,
};
