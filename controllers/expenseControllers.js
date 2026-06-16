import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);

    const expense = await Expense.create(req.body);

    console.log("SAVED:", expense);

    res.status(201).json({
      success: true,
      message: "Expense Added",
      expense
    });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};