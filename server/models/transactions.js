// imports goes here
import db from '../config/db';
class Transaction {

    async saveMoney(money) {
        this.savedMoney = [
            money.transactionId,
            money.amount,
            money.userId,
            money.transactionCode,
            money.comment
        ];
    try {
        const saveMoney = await db.pool.query(`INSERT INTO 
        transactions(transactionId, amount, userId, transactionDate, transactionCode, comment)
        VALUES ($1, $2, $3, $4, $5, $6) returning *`,
        this.savedMoney);
        return saveMoney.rows[0];
    }
    catch (error) {
        console.log(error);
        return false
    }
    }
};

  export default new Transaction();