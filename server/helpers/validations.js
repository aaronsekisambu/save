import Validate from 'celebrate';

const userSignup = {
  body: {
    email: Validate.Joi.string().email().required(),
    password: Validate.Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  },
};

export default {
  userSignup,
};
