import Income from "./Income.js";
import Expenses from "./Expenses.js";
import IncomeHistory from "./IncomeHistory.js";

const currentIncome = new Income("0rx4gtLik4TScOJb6JHorZJ6iqf2");
const incomeHistory = new IncomeHistory("0rx4gtLik4TScOJb6JHorZJ6iqf2");
const expenses = new Expenses("0rx4gtLik4TScOJb6JHorZJ6iqf2");
// example incomes
// const incomes = [
//     {userId:"0rx4gtLik4TScOJb6JHorZJ6iqf2", frequency: 'oneTime', startDate: '2024-06-15', endDate: '2024-06-15', amount: 1000 },
//     {userId:"0rx4gtLik4TScOJb6JHorZJ6iqf2", frequency: 'monthly', startDate: '2024-05-01', endDate: '2024-08-01', amount: 1000 },
//     {userId:"0rx4gtLik4TScOJb6JHorZJ6iqf2", frequency: 'biweekly', startDate: '2024-08-01', endDate: null, amount: 1000 },
//     {userId:"0rx4gtLik4TScOJb6JHorZJ6iqf2", frequency: 'weekly', startDate: '2024-09-10', endDate: null, amount: 10000 },
//   ];

//   for (const income of incomes) {
//     await currentIncome.create(currentIncome.collection, income);
//   }

// console.log(await currentIncome.listActiveIncomes('2024-09-01', '2024-09-30'));

// example incomHistory
// const incomes = [
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-09-01', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 120 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-09-07', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 90 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-09-12', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 140 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-09-18', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 200 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-09-25', incomeId: "PHo9tdXr6UptYSk8XSkm", received: false, amount: 180 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-10-01', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 160 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-10-05', incomeId: "PHo9tdXr6UptYSk8XSkm", received: false, amount: 130 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-10-10', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 175 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-10-15', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 220 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-10-20', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 140 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-11-01', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 150 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-11-07', incomeId: "PHo9tdXr6UptYSk8XSkm", received: false, amount: 170 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-11-12', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 130 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-11-18', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 190 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-11-25', incomeId: "PHo9tdXr6UptYSk8XSkm", received: false, amount: 210 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-12-01', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 160 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-12-07', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 180 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-12-12', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 200 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-12-18', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 190 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-12-25', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 210 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-01-06', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 250 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-01-12', incomeId: "PHo9tdXr6UptYSk8XSkm", received: false, amount: 140 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-01-18', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 180 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-01-25', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 220 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-02-05', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 160 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-02-15', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 190 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-02-22', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 210 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-03-01', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 170 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-03-10', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 230 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-03-20', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 200 },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", date: '2024-04-01', incomeId: "PHo9tdXr6UptYSk8XSkm", received: true, amount: 220 }
// ];

//   for (const income of incomes) {
//     await incomeHistory.create(incomeHistory.collection, income);
//   }

//console.log(await incomeHistory.listActiveIncomes('2024-09-01', '2024-09-30'));

// example expenses
// const expensesArray = [
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-08', payDate: '2024-09-08', amount: 250, category: 'Gasoline' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-10', payDate: '2024-09-12', amount: 75, category: 'Groceries (Meat/Dairy)' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-15', payDate: null, amount: 180, category: 'Electronics' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-18', payDate: '2024-09-18', amount: 100, category: 'Fuel' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-20', payDate: '2024-09-22', amount: 60, category: 'Public Transportation' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-25', payDate: null, amount: 300, category: 'Flights' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-27', payDate: '2024-09-27', amount: 40, category: 'Clothing' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-09-30', payDate: '2024-10-01', amount: 120, category: 'Appliances' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-10-03', payDate: '2024-10-04', amount: 95, category: 'Furniture' },
//     { userId: "0rx4gtLik4TScOJb6JHorZJ6iqf2", dueDate: '2024-10-05', payDate: null, amount: 50, category: 'Dining Out (Meat-heavy meals)' }
//   ];

//   for (const exp of expensesArray) {
//     await expenses.create(expenses.collection, exp);
//   }

console.log(await expenses.listActiveExpenses("2024-08-01", "2024-10-30"));
