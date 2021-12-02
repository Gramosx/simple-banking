import { Transaction } from './banking/banking.types';

export const user = [
  {
    id: 1,
    name: 'Tirth',
  },
  {
    id: 2,
    name: 'Rahul',
  },
  {
    id: 3,
    name: 'Gaurav',
  },
  {
    id: 4,
    name: 'Pramod',
  },
];
export const transactions: Transaction[] = [
  {
    userId: 1,
    transactionType: true,
    amount: 2500,
    date: '1/18/2021',
  },
  {
    userId: 1,
    transactionType: false,
    amount: 3578,
    date: '1/19/2021',
  },
  {
    userId: 1,
    transactionType: false,
    amount: 9632,
    date: '1/19/2021',
  },
  {
    userId: 2,
    transactionType: true,
    amount: 4520,
    date: '1/25/2021',
  },
];
