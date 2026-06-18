import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {

    const expense = await Expense.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Expense Added",
      expense
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

export const getExpenses = async (req, res) => {

  try {

    const expenses = await Expense.find({
      userId: req.params.userId
    });

    res.status(200).json({
      success: true,
      expenses
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};
export const deleteExpense = async (req, res) => {

  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Expense Deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};
export const updateExpense = async (
  req,
  res
) => {

  try {

    const expense =
  await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

    res.status(200).json({
      success: true,
      message: "Expense Updated",
      expense
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};