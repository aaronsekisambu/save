import express from 'express';
import loans from './routes/loans';
import joiErrors from './middleware/joiValidator';

const app = express();

app.use(express.json());
app.use(loans);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loans);

/**
 * Error validation middleware has to be at the end of all routes
 */
app.use(joiErrors);

app.listen(PORT, () => console.log(`App starts at PORT=${PORT}`));
