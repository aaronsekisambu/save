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

  async userLogin(req,res) {
    const {email, password} = req.body;
    const user = await userModel.userLogin()
  }
};

export default user;
