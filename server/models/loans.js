import db from '../config/db';
import queries from '../config/queries';

class Loan {
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
      const requestLoan = await db.executeQuery(queries.createLoan, this.newLoan);
      return requestLoan.rows[0];
    } catch (error) {
      return false;
    }
  }

  /*
  * @param {id} id
  * @ returns {Object} loan object
  */
  async findLoan(id) {
    try {
      this.findSingleLoan = await db.executeQuery(queries.getLoan, [id]);
      return this.findSingleLoan;
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
      this.approveLoans = await db.executeQuery(queries.changeLoanStatus, data);
      return this.approveLoan.rows[0];
    } catch (err) {
      return err;
    }
  }

  async checkLoanStatus(data) {
    this.loanId = [data.id];
    try {
      const loanStatus = await db.executeQuery(queries.createTransactionsTable, this.loanId);
      return loanStatus.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new Loan();
