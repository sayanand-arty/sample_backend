import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router/router.js';
import connectDB from './db/db.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT}`);
});
