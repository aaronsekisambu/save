// here we create the user and catch the token
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const getToken = () => {
  let token;
  const user = {
    firstName: 'munaca',
    lastName: 'clintonss',
    employmentDate: 'Friday, 29 May 2015',
    membershipDate: 'Friday, 29 May 2015',
    nationality: 'rwandan',
    phoneNumber: 123,
    email: 'hello@gmail.com',
    profileImage: 'dsdedd',
    slackHandle: '@bbobo',
    salt: 'dddddd',
  };
  return chai.request('http://localhost:3000')
    .post('/api/v1/auth/signup')
    .send(user);
};

export default getToken;
