import express from 'express'
import { login, signup, task } from '../controllers/userController.js'
import {
    addExpense,getExpenses,deleteExpense,updateExpense
} from "../controllers/expenseControllers.js";
import {
  addIncome,
  getIncome
} from "../controllers/incomeController.js";




const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/task', task)
router.post(
    "/expense",
    addExpense
);
router.get("/expense/:userId", getExpenses);
router.delete("/expense/:id",deleteExpense);

router.post("/income",addIncome);
router.get("/income/:userId",getIncome);
router.put("/expense/:id",updateExpense)

export default router;