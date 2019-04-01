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
            id = res.body.user.userid;
          });
      })
      .catch(err => console.log(err));
  });

  after(async () => {
    try {
      // await db.pool.query('TRUNCATE loans CASCADE;');
      // await db.pool.query('TRUNCATE users CASCADE;');
    } catch (error) {
      console.log(error);
    }
  });
  // request a Loan
  describe('/POST', () => {
    it('should request the loan', (done) => {
      const loan = {
        userId: 'e52bced4-57c0-4f0f-86ed-27baa2511f17',
        guarantor: 'e52bced4-57c0-4f0f-86ed-27baa2511f17',
        amount: 2002,
        interest: '33',
        totalAmount: 333,
        paymentPeriod: 22,
        loanStatus: 'approved',
        startdate: 'Friday, 29 May 2015',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/loan/request')
        .send(loan)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not request the loan when all data are not represented', (done) => {
      const loan = {
        amount: 2002,
        interest: '33',
        totalAmount: 333,
        paymentPeriod: 22,
        loanStatus: 'approved',
        startdate: 'Friday, 29 May 2015',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/loan/request')
        .send(loan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          // res.body.message.should.have();
          done();
        });
    });
  });

  // Admin approve Loan
  describe('/UPDATE', () => {
    it('should change the loan status', (done) => {
      const loanApprove = {
        loanStatus: 'approved',
      };

      chai.request('http://localhost:3000')
        .patch('/api/v1/approve/a06638bb-7cb3-4409-b8aa-da6201d8ecb5')
        .send(loanApprove)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not approve the loan with invalid id', (done) => {
      const loan = {
        loanStatus: 'approved',
      };

      chai.request('http://localhost:3000')
        .patch('/api/v1/approve/ndnd')
        .send(loan)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          // res.body.message.should.have();
          done();
        });
    });
  });
});
