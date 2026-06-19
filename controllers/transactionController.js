import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";

export const getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [expenses, incomes] = await Promise.all([
      Expense.find({ userId }).lean(),
      Income.find({ userId }).lean()
    ]);

    const expenseTransactions = expenses.map((expense) => ({
      ...expense,
      type: "expense",
      date: expense.date || expense.createdAt
    }));

    const incomeTransactions = incomes.map((income) => ({
      ...income,
      type: "income",
      date: income.date || income.createdAt
    }));

    const transactions = [...expenseTransactions, ...incomeTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json({
      success: true,
      transactions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
