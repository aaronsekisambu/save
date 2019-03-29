import express from 'express';
import userRouter from './routes/users';
import loans from './routes/loans';
import joiErrors from './middleware/joiValidator';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(loans);

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.code).json(err.message);
// });

/**
 * Error validation middleware has to be at the end of all routes
 */
app.use(joiErrors);

app.listen(PORT, () => console.log(`App running at PORT ${PORT}`));
