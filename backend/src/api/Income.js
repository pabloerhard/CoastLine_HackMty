import CRUD from './CRUD.js';

export default class Income extends CRUD {
    constructor(userId) {
        super();
        this.collection = 'income';
        this.userId = userId;
    }
}