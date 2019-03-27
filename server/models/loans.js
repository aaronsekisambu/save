import db from '../config/db';
import queries from '../config/queries';

class Loan {
  constructor() {
    this.pool = db.pool;
  }

  async payBackLoan(data) {
    const {
      userId, loanId, guarantor, amount, paymentPeriod,
    } = data;
    const params = [userId, loanId, guarantor, amount, paymentPeriod];
    try {
      return await this.pool.query(queries.payBackLoan, params);
    } catch (error) {
      return error;
    }
  }
}

export default new Loan();
