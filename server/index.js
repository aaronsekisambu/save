import express from 'express';
import loans from './routes/loans';
import joiErrors from './middleware/joiValidator';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(joiErrors());

app.use(loans);

app.listen(PORT, () => console.log(`App starts at PORT=${PORT}`));
