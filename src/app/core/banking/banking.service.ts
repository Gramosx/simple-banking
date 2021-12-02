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

  createTransferTransaction(fromUser: User, toUser: User, amount: number) {
    // Check for Available balance in fromUser
    //Create Two Transaction
    //One to debit current user
    //One to credit other user
  }
  checkForPositiveBalance(userId: number, ammount: number) {
    //get Current Balance of user
    //If Eligible send true
  }
  getCurrentBalanceByUserId(userId: number) {
    //Get All Transaction and Subtract Debit and Credit to get available balance
    let _currentBal = 0;
    this.getTransactionsByUserId(userId).forEach((x) => {
      x.forEach((sigleTran) => {
        _currentBal += sigleTran.transactionType
          ? sigleTran.amount
          : -sigleTran.amount;
      });
    });
    return _currentBal;
  }
}
