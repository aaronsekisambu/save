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
}

export default new Loan();
