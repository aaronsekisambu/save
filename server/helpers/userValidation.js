import Validate from 'celebrate';

const deleteUser = {
  params: {
    id: Validate.Joi.string().uuid().required().trim(),
  },
};

export default {
  deleteUser,
};
