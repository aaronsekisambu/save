import ejwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

ENV.config();

const generateToken = (payload) => {
  const secret = process.env.SECRET;
  return jwt.sign({
    ...payload,
    exp: ((Date.now() / 1000) + (60 * 60)),
  }, secret);
};

const verifyToken = () => ejwt({
  secret: process.env.SECRET,
  userProperty: 'user',
  generateToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});

export default {
  generateToken,
  verifyToken,
};
