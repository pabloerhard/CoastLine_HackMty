import express from "express";
import Expenses from "./Expenses.js";
import cors from "cors";
import Income from "./Income.js";
import IncomeHistory from "./IncomeHistory.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/expenses/:functionCall", (req, res) => {
  console.log("hora: ", new Date().toISOString(), "body: ", req.body);
  const expenses = new Expenses(req.body.userId);
  const functionCall = req.params.functionCall;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  if (functionCall === "listActiveExpenses") {
    expenses.listActiveExpenses(startDate, endDate).then((result) => {
      console.log("result: ", result);
      res.send(result);
    });
  } else if (functionCall === "getCarbonFootprintAmountPerScore") {
    expenses
      .getCarbonFootprintAmountPerScore(startDate, endDate)
      .then((result) => {
        console.log("result: ", result);
        res.send(result);
      });
  } else if (functionCall === "create") {
    const body = {
      userId: req.body.userId,
      category: req.body.category,
      amount: req.body.amount,
      payDate: req.body.payDate,
      dueDate: req.body.dueDate,
    };
    expenses.create(expenses.collection, body).then((result) => {
      console.log("result: ", result);
      res.send(result);
    });
  } else if (functionCall === "getAmountPerCategory") {
    expenses.getAmountPerCategory(startDate, endDate).then((result) => {
      res.send(result);
    });
  }
});

app.post("/income/:functionCall", (req, res) => {
  console.log("hora: ", new Date().toISOString(), "body: ", req.body);
  const income = new Income(req.body.userId);
  const functionCall = req.params.functionCall;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  if (functionCall === "listActiveIncomes") {
    income.listActiveIncomes(startDate, endDate).then((result) => {
      console.log("result: ", result);
      res.send(result);
    });
  } else if (functionCall === "create") {
    const body = {
      userId: req.body.userId,
      frequency: req.body.frequency,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      amount: req.body.amount,
      name: req.body.name,
    };
    income.create(income.collection, body).then((result) => {
      console.log("result: ", result);
      res.send(result);
    });
  } else {
    res.send("Invalid function call");
  }
});

app.post("/incomeHistory/:functionCall", (req, res) => {
  console.log("hora: ", new Date().toISOString(), "body: ", req.body);
  const incomeHistory = new IncomeHistory(req.body.userId);
  const functionCall = req.params.functionCall;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  if (functionCall === "listActiveIncomes") {
    incomeHistory.listActiveIncomes(startDate, endDate).then((result) => {
      console.log("result: ", result);
      res.send(result);
    });
  } else if (functionCall === "create") {
    const body = {
      userId: req.body.userId,
      date: req.body.date,
      incomeId: req.body.incomeId,
      received: req.body.received,
      amount: req.body.amount,
    };
    incomeHistory.create(incomeHistory.collection, body).then((result) => {
      console.log("result: ", result);
      res.send(result);
    });
  } else {
    res.send("Invalid function call");
  }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Start the chat with initial context
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text:
            "You are an intelligent financial assistant designed to help users manage their personal finances. You will:" +
            "1. Provide personalized advice on budgeting, expense tracking, debt payoff strategies, and saving recommendations." +
            "2. Analyze the user's financial data, including income, expenses, debts, and goals, to deliver tailored responses." +
            "3. Offer proactive suggestions to help users optimize their financial health." +
            "4. Engage in a natural and conversational tone while ensuring clarity and accuracy in financial advice." +
            "In addition to these core functions, you will also be able to answer general questions about personal finance, such as explaining financial terms, providing tips for improving credit scores, and recommending investment strategies. Also, the user will have some data like income and expenses; you will provide responses guided by those values.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello! I'm your financial assistant. I can help you with budgeting, expense tracking, debt payoff strategies, and saving recommendations. I can also analyze your financial data, including income, expenses, debts, and goals, to deliver tailored responses. How can I assist you today?",
        },
      ],
    },
  ],
  generationConfig: {
    maxOutputTokens: 150,
  },
});

app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();
    res.send({ response: text });
  } catch (error) {
    res
      .status(500)
      .send({
        response:
          "I'm sorry, I don't understand that. Could you please rephrase?",
      });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
