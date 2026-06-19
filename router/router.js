import express from 'express';
import authRouter from './authRouter.js';
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from '../controllers/expenseControllers.js';
import {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} from '../controllers/incomeController.js';
import { getTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.use('/', authRouter);

router.post('/expense', addExpense);
router.get('/expense/:userId', getExpenses);
router.delete('/expense/:id', deleteExpense);
router.put('/expense/:id', updateExpense);

router.post('/income', addIncome);
router.get('/income/:userId', getIncome);
router.put('/income/:id', updateIncome);
router.delete('/income/:id', deleteIncome);

router.get('/transactions/:userId', getTransactions);

export default router;
