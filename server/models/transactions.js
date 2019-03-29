// imports goes here
import moment from 'moment';
import db from '../config/db';

class Transaction {
  async saveMoney(data) {
    this.savedMoney = [
      data.amount,
      moment(new Date()),
      data.transactionCode,
      data.comment,
    ];
    try {
      const queryMoneySaved = `INSERT INTO 
      transactions(amount, transactionDate, transactionCode, comment)
      VALUES ($1, $2, $3, $4) returning *`;
      const checkMoneySaved = await db.pool.query(queryMoneySaved, this.savedMoney);
      return checkMoneySaved.rows[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Transaction();
