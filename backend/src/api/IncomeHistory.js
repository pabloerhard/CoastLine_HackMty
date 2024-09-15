import CRUD from './CRUD.js';

export class IncomeHistory extends CRUD {
    constructor() {
        super();
        this.collection = 'incomeHistory';
    }
}
