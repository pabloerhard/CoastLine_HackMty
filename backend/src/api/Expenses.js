import CRUD from './CRUD.js';

export default class Expenses extends CRUD {
    constructor(userId) {
        super();
        this.collection = 'expenses';
        this.userId = userId;
        this.carbonFootprintScores = {
            "Fuel": 5,
            "Gasoline": 5,
            "Electricity": 3,
            "Natural Gas": 4,
            "Public Transportation": 2,
            "Flights": 5,
            "Groceries (Meat/Dairy)": 4,
            "Groceries (Plant-based)": 2,
            "Clothing": 3,
            "Electronics": 4,
            "Appliances": 4,
            "Furniture": 3,
            "Home Repairs": 3,
            "Construction Materials": 5,
            "Waste Disposal": 3,
            "Recycling Services": 2,
            "Water Usage": 2,
            "Rent/Mortgage": 2,
            "Dining Out (Meat-heavy meals)": 4,
            "Dining Out (Plant-based meals)": 2,
            "Entertainment (Movies/Streaming)": 1,
            "Hotel Stays/Travel": 3,
            "Entertainment": 2,
            "Loan Payments": 0
        };
    }

    doesOverlap(start1, end1, start2, end2) {
        return start1 <= end2 && end1 >= start2;
    }

    isExpenseValid(expense, startDateFilter, endDateFilter) {
        const { payDate, dueDate } = expense;
    
        const payDateObj = payDate ?? new Date(payDate);
        const dueDateObj = new Date(dueDate);
        const startDateObj = new Date(startDateFilter);
        const endDateObj = new Date(endDateFilter);
    
        const isPayDateValid = payDateObj && payDateObj >= startDateObj && payDateObj <= endDateObj;
        const isDueDateValid = dueDateObj >= startDateObj && dueDateObj <= endDateObj;
    
        return isPayDateValid || isDueDateValid;
    }

    async listActiveExpenses(startDate, endDate) {
        const list = await this.listByUserId(this.collection, this.userId);
        const listExpenses = [];

        list.forEach((expense) => {
            if (this.isExpenseValid(expense, new Date(startDate), new Date(endDate))) {
                expense.amount = parseFloat(expense.amount);
                listExpenses.push(expense);
            }
        });

        return listExpenses;
    }

    async getCarbonFootprintAmountPerScore(start, end) {
        let expenses = await this.listActiveExpenses(start, end)
        let totalAmounts = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
        expenses.forEach(expense => {
            totalAmounts[this.carbonFootprintScores[expense.category]] += expense.amount
        })
        return totalAmounts;
    }

    async getAmountPerCategory(start, end) {
        let expenses = await this.listActiveExpenses(start, end)
        let totalAmounts = {}
        expenses.forEach(expense => {
            if (totalAmounts[expense.category]) {
                totalAmounts[expense.category] += expense.amount
            } else {
                totalAmounts[expense.category] = expense.amount
            }
        })
        return totalAmounts;
    }
}