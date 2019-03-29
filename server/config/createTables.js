import db from './db';
import queries from './queries';

class Setup {
  constructor() {
    this.pool = db.pool;
    this.createTables();
  }

  async createTables() {
    await this.pool.query(queries.createUserTable).catch(err => console.log(err));
    await this.pool.query(queries.createLoansTable).catch(err => console.log(err));
    await this.pool.query(queries.createTransactionsTable).catch(err => console.log(err));
  }
}
export default new Setup();