import express from 'express'
import { login, signup, task } from '../controllers/userController.js'
import {
    addExpense
} from "../controllers/expenseControllers.js";
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/task', task)
router.post(
    "/expense",
    addExpense
);

export default router;