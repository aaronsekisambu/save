import userModel from '../models/users';

const user = {
  async deleteUser(req, res) {
    const response = await userModel.deleteUser(req.body);
    return res.status(201).send({
      status: res.statusCode,
      message: response,
    });
  },
};

export default user;
