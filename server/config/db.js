import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();

class Database {
  constructor() {
    this.connectionString = process.env.DATABASE_URL;
    this.pool = new Pool({
      connectionString: this.connectionString,
    });
    this.pool.on('connect', () => console.log(`connected to the database on${this.connectionString}`));
    this.pool.on('error', (error, client) => console.error(`unexpected error on idle client ${client} ${error}`));
    this.pool.on('remove', () => console.log('client removed'));
  }
}

export default new Database();
