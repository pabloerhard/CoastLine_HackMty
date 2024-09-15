import CRUD from './CRUD.js';

export default class Income extends CRUD {
    constructor(userId) {
        super();
        this.collection = 'income';
        this.userId = userId;
        this.frequencies = {
            "monthly": 1,
            "biweekly": 2,
            "weekly": 4,
        }
    }
    doesOverlap(start1, end1, start2, end2) {
        return start1 <= end2 && end1 >= start2;
    }

    isIncomeValid(income, startDateFilter, endDateFilter) {
        const { frequency, startDate, endDate } = income;
        
        const startDateObj = new Date(startDate);
        const endDateObj = endDate ? new Date(endDate) : null;
        
        if (frequency === 'oneTime') {
          // For one-time incomes, check if the single date overlaps with the filter range
          return this.doesOverlap(startDateObj, startDateObj, startDateFilter, endDateFilter);
        } else {
          // For recurring incomes
          if (endDateObj) {
            // If endDate is specified, check for overlap between the income period and filter range
            return this.doesOverlap(startDateObj, endDateObj, startDateFilter, endDateFilter);
          } else {
            // If endDate is null, assume the income is ongoing
            return this.doesOverlap(startDateObj, new Date(), startDateFilter, endDateFilter);
          }
        }
      }

    async listActiveIncomes(startDate, endDate) {
        const list = await this.listByUserId(this.collection, this.userId);
        const listIncomes = [];

        list.forEach((income) => {
            if (this.isIncomeValid(income, new Date(startDate), new Date(endDate))) {
                income.amount = parseFloat(income.amount * this.frequencies[income.frequency]);
                listIncomes.push(income);
            }
        });

        return listIncomes;
    }

}