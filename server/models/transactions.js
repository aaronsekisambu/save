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
      const checkMoneySaved = await db.pool.query(queryMoneySaved, this.savedMoney);
      return checkMoneySaved.rows[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async approveSaving(data) {
    this.approvedSaving = [
      data.userId,
      data.amount,
      moment(new Date()),
      data.transactionCode,
      data.comment,
    ];
    try {
      const queryUpdateAmount = queries.updateSingleTransaction;
      const checkAmountUpdated = await db.pool(queryUpdateAmount, this.approvedSaving);
      return checkAmountUpdated.rows[0];
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default new Transaction();
