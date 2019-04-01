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
      const queryMoneySaved = queries.createSavings;
      const checkMoneySaved = await db.executeQuery(queryMoneySaved, this.savedMoney);
      return checkMoneySaved.rows[0];
    } catch (error) {
      return error;
    }
  }

  async approveSaving(data, userId) {
    this.approvedSaving = [
      data.amount,
      data.transactionCode,
      data.comment,
      userId,
      data.transactionid,
    ];
    try {
      const queryUpdateAmount = queries.updateSingleTransaction;
      return await db.pool.query(queryUpdateAmount, this.approvedSaving);
    } catch (e) {
      return e;
    }
  }
}

export default new Transaction();
