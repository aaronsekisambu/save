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

export default {
  deleteUser,
  userSignup,
};
