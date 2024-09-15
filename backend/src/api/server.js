import express from 'express';
import Expenses from './Expenses.js';
import cors from 'cors';
import Income from './Income.js';
import IncomeHistory from './IncomeHistory.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/expenses/{functionCall}', (req, res) => {
    const expenses = new Expenses(req.body.userId);
    const functionCall = req.params.functionCall;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (functionCall === 'listActiveExpenses') {
        expenses.listActiveExpenses(startDate, endDate).then((result) => {
            res.send(result);
        });
    } else if (functionCall === 'getCarbonFootprintAmountPerScore') {
        expenses.getCarbonFootprintAmountPerScore(startDate, endDate).then((result) => {
            res.send(result);
        });
    } else if (functionCall === 'create') {
        const body = {
            userId: req.body.userId,
            category: req.body.category,
            amount: req.body.amount,
            payDate: req.body.payDate,
            dueDate: req.body.dueDate
        };
        expenses.create(expenses.collection, body).then((result) => {
            res.send(result);
        });
    } else if (functionCall === 'getAmountPerCategory') {
        expenses.getAmountPerCategory(startDate, endDate).then((result) => {
            res.send(result);
        });
    }
});

app.post('/income/{functionCall}', (req, res) => {
    const income = new Income(req.body.userId);
    const functionCall = req.params.functionCall;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (functionCall === 'listActiveIncomes') {
        income.listActiveIncomes(startDate, endDate).then((result) => {
            res.send(result);
        });
    } else if (functionCall === 'create') {
        const body = {
            userId: req.body.userId,
            frequency: req.body.frequency,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            amount: req.body.amount,
            name: req.body.name
        };
        income.create(income.collection, body).then((result) => {
            res.send(result);
        });
    } else {
        res.send("Invalid function call");
    }
});

app.post('/incomeHistory/{functionCall}', (req, res) => {
    const incomeHistory = new IncomeHistory(req.body.userId);
    const functionCall = req.params.functionCall;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (functionCall === 'listActiveIncomes') {
        incomeHistory.listActiveIncomes(startDate, endDate).then((result) => {
            res.send(result);
        });
    } else if (functionCall === 'create') {
        const body = {
            userId: req.body.userId,
            date: req.body.date,
            incomeId: req.body.incomeId,
            received: req.body.received,
            amount: req.body.amount
        };
        incomeHistory.create(incomeHistory.collection, body).then((result) => {
            res.send(result);
        });
    } else {
        res.send("Invalid function call");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});