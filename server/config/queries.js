const createUser = `
	INSERT INTO users (
		email,
	  salt,
	  hash
	) VALUES ($1,$2,$3)
	RETURNING *;
  `;

const updateUser = `
		UPDATE users SET 
				firstName = $1,
				lastName = $2,
				employmentDate = $3,
				membershipDate = $4,
				nationality = $5,
				phoneNumber = $6,
				email = $7,
				profileImage = $8,
				slackHandle = $9,
				salt = $10,
				hash = $11
		   WHERE userId = $12
		   RETURNING *; 
	`;
const approveUser = `
	UPDATE users 
	SET membershipDate = now()
	WHERE userId = $1
	RETURNING *;
	`

const getUser = `
        SELECT * FROM users
        where userId = $1;
    `;

const getUserByEmail = `
        SELECT * FROM users
        where email = $1;
    `;

const deleteUser = `
		DELETE FROM users
		WHERE userId = $1;
	`;
	
const createLoan = `
		INSERT INTO loans (
		  "userid",
		  "guarantor",
		  "amount",
		  "interest",
		  "totalamount",
		  "paymentperiod",
		  "loanstatus",
		  "startdate"
			 ) VALUES (
					(SELECT userId from users WHERE userId = $1),
					(SELECT userId from users WHERE userId = $2),
					$3,
					$4,
					$5,
					$6,
					$7,
					$8
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
const getLoan = `
  SELECT * FROM loans
    where loanId = $1
`;
const changeLoanStatus = `
								UPDATE loans
								SET loanStatus=$1 WHERE loanId=$2 returning *`;
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
				$2,
				$3,
				$4,
				$5) 
			RETURNING *; 
	`;
const getSingleTransaction = `
        SELECT * FROM transactions
        WHERE transactionId = $1;
				`;
const createUserTable = `
		CREATE TABLE IF NOT EXISTS users(
				userId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
				firstName VARCHAR(255),
				lastName VARCHAR(255),
				employmentDate DATE,
				membershipDate DATE,
				isAdmin BOOLEAN DEFAULT false,
				nationality VARCHAR(50),
				phoneNumber INTEGER,
				email VARCHAR(255) UNIQUE,
				profileImage VARCHAR(255),
				slackHandle VARCHAR(50),
				salt TEXT,
				hash TEXT
			);
		`;

const createLoansTable = `
	CREATE TABLE IF NOT EXISTS loans(
		loanId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		userId UUID REFERENCES users(userId),
		guarantor UUID REFERENCES users(userId),
		amount INTEGER NOT NULL,
		interest INTEGER NOT NULL,
		totalAmount INTEGER NOT NULL,
		paymentPeriod INTEGER NOT NULL,
		loanStatus TEXT,
		startDate DATE
			);
    `;



const createTransactionsTable = `
			CREATE TABLE IF NOT EXISTS transactions(
				transactionId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
				amount INTEGER NOT NULL,
				userId UUID REFERENCES users(userId),
				transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				transactionCode INTEGER NOT NULL,
				comment  TEXT
			);
		`;

const dropTables = `
		   DROP TABLE IF EXISTS 
		   users,loans,transactions;
	`;

export default {
  createUser,
  updateUser,
  approveUser,
  getUser,
  getUserByEmail,
  deleteUser,
  createLoan,
  getSingleUserLoan,
  getUserLoans,
  getLoan,
  changeLoanStatus,
  getUserSavings,
  createTransaction,
  getSingleTransaction,
  createUserTable,
  createLoansTable,
  createTransactionsTable,
  dropTables,
};
