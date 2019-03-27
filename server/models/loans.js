// impoting the modules
import db from '../config/db';

class Loan {
  async requestLoan(data) {
    this.newLoan = [
			data.loanId,
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
      const requestLoan = await db.pool.query(`INSERT INTO 
						loans(
							"loanid",
							"userid",
							"guarantor",
							"amount",
							"interest",
							"totalamount",
							"paymentperiod",
							"loanstatus",
							"startdate"
						) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
						returning *`,
      this.newLoan);
      return requestLoan.rows[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // async getUserId() {
  // 	const queryText = 'SELECT * FROM users userId = $1 '
  // }
}

export default new Loan();
