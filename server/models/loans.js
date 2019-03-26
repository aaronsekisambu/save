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

  async requestLoan(data) {
    this.newLoan = [
      data.userId,
      data.guarantor,
      data.amount,
      data.interest,
      data.totalAmount,
      data.paymentPeriod,
      data.loanStatus,

    ];

    try {
      const requestLoan = await db.pool.query(`INSERT INTO 
			loans(
				"userid",
				"guarantor",
				"amount",
				"interest",
				"totalamount",
				"paymentperiod",
				"loanstatus",
				"startdate"
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			returning *`,
      this.newLoan);
      return requestLoan.rows[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Loan();
