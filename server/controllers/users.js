import userModel from '../models/users';

const user = {
  async deleteUser(req, res) {
    const {
      rowCount,
    } = await userModel.deleteUser(req.params);
    if (rowCount !== 0) {
      return res.status(200).send({
        status: res.statusCode,
        message: 'User deleted successfuly from members',
      });
    }
    return res.status(404).send({
      status: res.statusCode,
      message: 'User not found',
    });
  },
};

export default user;
