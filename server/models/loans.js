<<<<<<< HEAD
import db from '../config/db';
import queries from '../config/queries';
=======
// impoting the modules
import db from '../config/db';
>>>>>>> [ch-164831850] creating model for requesting a loan

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
}

export default new Loan();
