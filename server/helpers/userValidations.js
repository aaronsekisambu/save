import Validate from 'celebrate';

const deleteUser = {
  params: {
    id: Validate.Joi.string().uuid().required().trim(),
  },
};

const userSignup = {
  body: {
    email: Validate.Joi.string().required(),
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
  deleteUser,
  userSignup,
  userLogin,
};
