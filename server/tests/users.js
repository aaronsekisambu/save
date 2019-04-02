// import the test here
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../config/createTables';
import getToken from './baseTest';

const should = chai.should();
// const expect = chai.expect();

chai.use(chaiHttp);
describe('Loan', () => {
  let token;
  let id;
  before(async () => {
    await db.createTables()
      .then(async () => {
        await getToken()
          .then((res) => {
            token = res.body.token;
            id = res.body.user.userid;
          });
      })
      .catch(err => console.log(err));
  });

  after(async () => {
    try {
      // await db.pool.query('TRUNCATE loans CASCADE;');
      await db.pool.query('TRUNCATE users CASCADE;');
    } catch (error) {
      console.log(error);
    }
  });
  // request a Loan
  describe('/POST', () => {
    it('should create a user', (done) => {
      const user = {
        email: 'user@gmail.com',
        password: 'hello',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should create a user', (done) => {
      const user = {
        password: 'hello',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  // Login a user
  describe('/POST', () => {
    it('should create a user', (done) => {
      const user = {
        email: 'user@gmail.com',
        password: 'hello',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should create a user', (done) => {
      const user = {
        password: 'hello',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
