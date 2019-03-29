import express from 'express';
import save from './routes/transactions';
import loans from './routes/loans';
import userRoute from './routes/users';
import joiErrors from './middleware/joiValidator';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(save);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRouter);
app.use(loans);
app.use(userRoute);

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.code).json(err.message);
// });

/**
 * Error validation middleware has to be at the end of all routes
 */
app.use(joiErrors);

app.listen(PORT, () => console.log(`App running at PORT ${PORT}`));
