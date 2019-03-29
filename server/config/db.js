import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();

class Database {
  constructor() {
    this.connectionString = process.env.DATABASE_URL;
    this.pool = new Pool({
      connectionString: this.connectionString,
    });
    this.pool.on('connect', () => console.log('Database is connected......'));
    this.pool.on('error', error => console.error(error));
    this.pool.on('remove', () => console.log('client removed'));
  }

  async executeQuery(query, params) {
    const response = await this.pool.query(query, params)
      .then(res => res)
      .catch(err => err);
    return response;
  }
}

export default new Database();
