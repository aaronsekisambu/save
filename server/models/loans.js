import db from '../config/db';
import queries from '../config/queries';

class Loan {
  async payBackLoan(data) {
    const {
      userId, amount, transactionDate, transactionCode, comment,
    } = data;
    this.params = [userId, amount, transactionDate, transactionCode, comment];
    try {
      const { rows } = await db.executeQuery(queries.createTransaction, this.params);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default new Loan();
