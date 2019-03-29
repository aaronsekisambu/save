// imports goes here
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import db from '../config/db';

class Transaction {
  async saveMoney(data) {
    this.savedMoney = [
      uuidv4(),
      data.amount,
      // uuidv4(),
      moment(new Date()),
      data.transactionCode,
      data.comment,
    ];
    try {
      const queryMoneySaved = `INSERT INTO 
      transactions(transactionId, amount, transactionDate, transactionCode, comment)
      VALUES ($1, $2, $3, $4, $5) returning *`;
      const checkMoneySaved = await db.pool.query(queryMoneySaved, this.savedMoney);
      return checkMoneySaved.rows[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Transaction();
