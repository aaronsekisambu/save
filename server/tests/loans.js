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
    it('should request the loan', (done) => {
      const loan = {
        userId: id,
        guarantor: id,
        amount: 2002,
        interest: '33',
        totalAmount: 333,
        paymentPeriod: 22,
        loanStatus: 'approved',
        startdate: 'Friday, 29 May 2015',
      };

      chai.request('http://localhost:3000')
        .post('/api/v1/loans/request')
        .set('Authorization', `Bearer ${token}`)
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
        .post('/api/v1/loans/request')
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
        .patch(`/api/v1/approve/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(loanApprove)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });

    // this endpoint requires the admin rights
    it('should not approve the loan with no admin rights and filled datas', (done) => {
      const loan = {
        loanStatus: 'approved',
      };

      chai.request('http://localhost:3000')
        .patch('/api/v1/approve/ndnd')
        .set('Authorization', `Bearer ${token}`)
        .send(loan)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          // res.body.message.should.have();
          done();
        });
    });
  });
});
