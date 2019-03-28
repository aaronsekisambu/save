import express from 'express';
import joiErrors from './middleware/joiErrors';
import userRouter from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRouter);

app.use(joiErrors);
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.code).json(err.message);
// });
app.listen(PORT, () => console.log(`App starts at PORT=${PORT}`));
