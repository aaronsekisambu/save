import express from 'express';
import save from './routes/transactions';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(save)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Good');
});

app.listen(PORT, () => console.log(`App starts at PORT=${PORT}`));
