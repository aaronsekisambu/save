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
            id = res.body.data[0].user.id;
            token = res.body.data[0].token;
            return token;
          });
      })
      .catch(err => console.log(err));
  });

  after(async () => {
    try {
      await pool.query('TRUNCATE laons CASCADE; ALTER SEQUENCE loans_id_seq RESTART WITH 1;');
      await pool.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  // request a Loan
  describe('/POST', () => {
    it('should request the loan', (done) => {
      const loan = {
        userId: 'c1ebfb9f-5aba-489a-990b-5db7bcce869f',
        guarantor: 'c1ebfb9f-5aba-489a-990b-5db7bcce869f',
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
        .post(`/api/v1/loan/approved/${id}`)
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
        .post('/api/v1/loan/approve/ndnd')
        .send(loan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          // res.body.message.should.have();
          done();
        });
    });
  });
});
