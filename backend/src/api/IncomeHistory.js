import CRUD from './CRUD.js';

export default class IncomeHistory extends CRUD {
    constructor(userId) {
        super();
        this.collection = 'incomeHistory';
        this.userId = userId;
    }
    doesOverlap(date, start, end) {
        return date >= start && date <= end;
    }

    isIncomeValid(income, startDateFilter, endDateFilter) {
        const { date } = income;
        return this.doesOverlap(new Date(date), startDateFilter, endDateFilter);
    }
    async listActiveIncomes(startDate, endDate) {
        const list = await this.listByUserId(this.collection, this.userId);
        const incomeHistory = [];
        list.forEach((income) => {
            if (this.isIncomeValid(income, new Date(startDate), new Date(endDate))) {
                incomeHistory.push(income);
            }
        });
        return incomeHistory;
    }
}
