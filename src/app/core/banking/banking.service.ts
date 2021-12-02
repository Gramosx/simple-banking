import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { transactions } from '../data';
import { User } from '../user.types';
import { Transaction } from './banking.types';

@Injectable({
  providedIn: 'root',
})
export class BankingService {
  //Private
  private _transactions: BehaviorSubject<Transaction[] | null> =
    new BehaviorSubject(transactions);

  constructor() {}

  get transaction$(): Observable<Transaction[]> {
    return this._transactions.asObservable();
  }

  getTransactionsByUserId(userId): Observable<Transaction[]> {
    return this.transaction$.pipe(
      map((trans) => trans.filter((x) => x.userId == userId))
    );
  }

  addTransaction(trans: Transaction) {
    const updatedValue = [...this._transactions.value, trans];
    this._transactions.next(updatedValue);
  }

  createTransferTransaction(fromUserId: number, toUserId: number, amount) {
    // Check for Available balance in fromUser
    let bal = this.getCurrentBalanceByUserId(fromUserId);

    if (amount > bal) throw new Error('Insufficient Balanace');
    //Create Two Transaction

    //Debit From Current User
    let debitTrans: Transaction = {
      date: Date.now().toString(),
      userId: fromUserId,
      transactionType: false,
      amount: parseInt(amount),
    };
    //Create Credit Trans
    let creditTrans: Transaction = {
      date: Date.now().toString(),
      userId: toUserId,
      transactionType: true,
      amount: parseInt(amount),
    };
    //Add Transction To master

    this.addTransaction(debitTrans);
    this.addTransaction(creditTrans);
  }

  createDebitTransaction(id: number, amount) {
    // Check for Available balance in fromUser
    let bal = this.getCurrentBalanceByUserId(id);

    if (amount > bal) throw new Error('Insufficient Balanace');

    //Debit From Current User
    let debitTrans: Transaction = {
      date: Date.now().toString(),
      userId: id,
      transactionType: false, // False as it is Debit Transaction
      amount: parseInt(amount),
    };
    this.addTransaction(debitTrans);
  }
  createCreditTransaction(id: number, amount) {
    // Check for Available balance in fromUser
    let bal = this.getCurrentBalanceByUserId(id);

    //Credit From Current User
    let debitTrans: Transaction = {
      date: Date.now().toString(),
      userId: id,
      transactionType: true, // False as it is Debit Transaction
      amount: parseInt(amount),
    };
    this.addTransaction(debitTrans);
  }

  getCurrentBalanceByUserId(userId: number) {
    //Get All Transaction and Subtract Debit and Credit to get available balance
    let _currentBal: number = 0;
    this.getTransactionsByUserId(userId).forEach((x) => {
      x.forEach((sigleTran: Transaction) => {
        if (sigleTran.transactionType)
          _currentBal = _currentBal + sigleTran.amount;
        else _currentBal = _currentBal - sigleTran.amount;
      });
    });
    return _currentBal;
  }
}
