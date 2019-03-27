import db from './db';

class Setup {
  constructor() {
    this.pool = db.pool;
    this.createTables();
  }

  async createTables() {
    const users = `
        CREATE TABLE IF NOT EXISTS users(
                userId UUID PRIMARY KEY,
                firstName VARCHAR(255),
                lastName VARCHAR(255),
                employmentDate DATE,
                membershipDate DATE,
                nationality VARCHAR(50),
                phoneNumber INTEGER,
                email VARCHAR(255),
                profileImage VARCHAR(255),
                slackHandle VARCHAR(50),
                salt TEXT,
                hash TEXT
            );
        `;

    const loans = `
            CREATE TABLE IF NOT EXISTS loans(
                loanId UUID PRIMARY KEY,
                userId UUID REFERENCES users(userId),
                guarantor UUID REFERENCES users(userId),
                amount INTEGER NOT NULL,
                paymentPeriod INTEGER NOT NULL,
                startDate DATE
            );
        `;

    const transactions = `
            CREATE TABLE IF NOT EXISTS transactions(
                transactionId UUID PRIMARY KEY,
                amount INTEGER NOT NULL,
                userId UUID REFERENCES users(userId),
                transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                transactionCode INTEGER NOT NULL,
                comment  TEXT
            );
        `;
    await this.pool.query(users).catch(err => console.log(err));
    await this.pool.query(loans).catch(err => console.log(err));
    await this.pool.query(transactions).catch(err => console.log(err));
  }
}
export default new Setup();
