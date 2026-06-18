import Income from "../models/incomeModel.js";

export const addIncome =
async (req, res) => {

  try {

    const income =
      await Income.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Income Added",
      income
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

export const getIncome =
async (req, res) => {

  try {

    const income =
      await Income.find({
        userId:
          req.params.userId
      });

    res.status(200).json({
      success: true,
      income
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }

};