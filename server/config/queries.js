const createUser = `
        INSERT INTO users (
                firstName,
                lastName,
                employmentDate,
                membershipDate,
                nationality,
                phoneNumber,
                email,
                profileImage,
                slackHandle,
                salt,
                hash
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           RETURNING *; 
            
    `;

const getUser = `
        SELECT * FROM users
        where userId = $1;
    `;

const deleteUser = `
        DELETE * FROM users
        WHERE userId = $1;
    `;
const createLoan = `
        INSERT INTO loans (
                userId, 
                guarantor,
                amount,
                startDate,
                paymentPeriod,
             ) VALUES (
                    (SELECT userId from users WHERE userId = $1),
                    (SELECT userId from users WHERE userId = $2),
                    $3,
                    $4,
                    $5
                    )
            RETURNING *;
    `;

const getUserLoans = `
        SELECT * FROM loans 
        WHERE userId = (SELECT userId from users WHERE userId = $1),
        ORDER BY startDate DESC;
    `;

const getSingleUserLoan = `
        SELECT * FROM loans
        WHERE loanId = $1 AND userId = (SELECT userId from users WHERE userId = $2);
    `;

const getUserSavings = `
        SELECT * FROM transactions
        WHERE userId = (SELECT userId from users WHERE userId = $1)
            AND transactionCode = $2
        ORDER BY transactionDate DESC;
    `;
const createTransaction = `
        INSERT INTO transactions (
                userId,
                amount,
                transactionDate,
                transactionCode,
                comment
            ) VALUES (
                (SELECT userId from users WHERE userId = $1),
                $1,
                $2,
                $3,
                $4) 
            RETURNING *; 
    `;
const getSingleTransaction = `
        SELECT * FROM transactions
        WHERE transactionId = $1;
    `;

const createUserTable = `
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

const createLoansTable = `
            CREATE TABLE IF NOT EXISTS loans(
                loanId UUID PRIMARY KEY,
                userId UUID REFERENCES users(userId),
                guarantor UUID REFERENCES users(userId),
                amount INTEGER NOT NULL,
                paymentPeriod INTEGER NOT NULL,
                startDate DATE
            );
        `;

const createTransactionsTable = `
            CREATE TABLE IF NOT EXISTS transactions(
                transactionId UUID PRIMARY KEY,
                amount INTEGER NOT NULL,
                userId UUID REFERENCES users(userId),
                transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                transactionCode INTEGER NOT NULL,
                comment  TEXT
            );
        `;

const payBackLoan = `
        
        `;

const dropTables = `
           DROP TABLE IF EXISTS 
           users,loans,transactions;
    `;

export default {
  payBackLoan,
  createUser,
  getUser,
  deleteUser,
  createLoan,
  getSingleUserLoan,
  getUserLoans,
  getUserSavings,
  createTransaction,
  getSingleTransaction,
  createUserTable,
  createLoansTable,
  createTransactionsTable,
  dropTables,
};