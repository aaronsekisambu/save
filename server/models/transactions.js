// imports goes here
import moment from 'moment';
import db from '../config/db';
import queries from '../config/queries';

class Transaction {
  async saveMoney(data) {
    this.savedMoney = [
      data.userId,
      data.amount,
      moment(new Date()),
      data.transactionCode,
      data.comment,
    ];
    try {
      const queryMoneySaved = queries.createTransaction;
      const checkMoneySaved = await db.executeQuery(queryMoneySaved, this.savedMoney);
      return checkMoneySaved.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new Transaction();
