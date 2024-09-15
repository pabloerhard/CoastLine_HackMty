import Income from './Income.js';

const currentIncome = new Income('0rx4gtLik4TScOJb6JHorZJ6iqf2');
const id = await currentIncome.create(currentIncome.collection, 
    { userId: currentIncome.userId, amount: 1000, date: '2022-10-10' });
console.log(id);
const incomes = await currentIncome.listByUserId(currentIncome.collection, currentIncome.userId);
console.log(incomes);