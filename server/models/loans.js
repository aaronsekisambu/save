import db from '../config/db';
import queries from '../config/queries';

class Loan {
  constructor() {
    this.pool = db.pool;
  }

  async payBackLoan(data) {
    const {
      userId, amount, transactionDate, transactionCode, comment,
    } = data;
    const params = [userId, amount, transactionDate, transactionCode, comment];
    try {
      return await this.pool.query(queries.createTransaction, params);
    } catch (error) {
      return error;
    }
  }

  async requestLoan(data) {
    this.newLoan = [
      data.userId,
      data.guarantor,
      data.amount,
      data.interest,
      data.totalAmount,
      data.paymentPeriod,
      data.loanStatus,
      data.startdate,
    ];

    try {
      const requestLoan = await db.pool.query(queries.createLoan, this.newLoan);
      return requestLoan.rows[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /*
  * @param {id} id
  * @ returns {Object} loan object
  */
  async findLoan(id) {
    try {
      const findSingleLoan = await this.pool.query(queries.getLoan, [id]);
      return findSingleLoan;
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {uuid} id
  * @param {Object} data
  */
  async approveLoan(data) {
    try {
      const approveLoans = await this.pool.query(queries.changeLoanStatus, data);
      return approveLoans.rows[0];
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new Loan();
