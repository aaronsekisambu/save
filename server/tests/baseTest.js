// here we create the user and catch the token
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const getToken = () => {
  let token;
  const user = {
    email: 'new@gmail.com',
    password: 'hello',
  };
  return chai.request('http://localhost:3000')
    .post('/api/v1/auth/signup')
    .send(user);
};

export default getToken;
