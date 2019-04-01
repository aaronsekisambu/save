import crypto from 'crypto';
import userModel from '../models/users';
import auth from '../middleware/Auth';

const user = {
  async createUser(req, res) {
    const { email, password } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const response = await userModel.createUser({ email, salt, hash });

    if (response.rowCount === 1) {
      const userData = response.rows[0];
      const { userId } = userData;
      const token = auth.generateToken({ email, userId });

      res.status(201).json({
        status: 201,
        token,
        user: userData,
      });
      return;
    }
    const message = (response.code === '23505') ? `email ${req.body.email} already exists` : response.detail;
    res.status(400).json({
      status: res.statusCode,
      error: message,

    });
  },

  async deleteUser(req, res) {
    const {
      rowCount,
    } = await userModel.deleteUser(req.params);
    if (rowCount !== 0) {
      return res.status(200).send({
        status: res.statusCode,
        message: 'User deleted successfully from members',
      });
    }
    return res.status(404).send({
      status: res.statusCode,
      message: 'User not found',
    });
  },

  async userLogin(req, res) {
    const { email, password } = req.body;
    const response = await userModel.getUser(email);

    if (!(response.rowCount === 1)) {
      res.status(400).json({
        status: res.statusCode,
        error: `user with email ${email} not found`,
      });
      return;
    }

    const { salt, hash, userId } = response.rows[0];
    const currentHash = crypto.pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      'sha512',
    ).toString('hex');

    if (hash === currentHash) {
      const token = auth.generateToken({ email, password, userId });
      res.status(200).json({
        status: res.statusCode,
        token,
        email,
        userId,
      });
      return;
    }

    res.status(400).json({
      status: res.statusCode,
      error: 'incorrect password',
    });
  },

  async approveUser(req, res) {
    const {
      rowCount,
    } = await userModel.approveUser(req.params);

    if (rowCount !== 0) {
      return res.status(200).send({
        status: res.statusCode,
        message: 'Membership approved',
      });
    }

    return res.status(404).send({
      status: res.statusCode,
      message: 'User not found',
    });
  },

  async getDetails(req, res) {
    const response = await userModel.getUserDetails(req.params.id);
    const loans = await userModel.getUserLoans(req.params.id);
    const transaction = await userModel.getUserTransactions(req.params.id);

    if (response.rowCount !== 0) {
      return res.status(200).send({
        status: res.statusCode,
        user: response.rows,
        loans: loans.rows,
        transaction: transaction.rows,
      });
    }

    return res.status(404).send({
      status: res.statusCode,
      message: 'User not found',
    });
  },
};

export default user;
