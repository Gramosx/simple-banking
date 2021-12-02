import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankingService } from '../../../core/banking/banking.service';
import { Transaction } from '../../../core/banking/banking.types';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() transaction$: Observable<Transaction[]>;

  displayedColumns: string[] = ['date', 'debit', 'credit', 'bal'];

  constructor(private dialogRef: MatDialogRef<TransactionTableComponent>) {}

  ngOnInit(): void {}
  getCreditBal(trans: Transaction) {
    return trans.transactionType ? trans.amount : 0;
  }
  getDebitBal(trans: Transaction) {
    return trans.transactionType ? 0 : trans.amount;
  }
  getAsOfBal(trans: Transaction) {
    this.transaction$.pipe();
  }
}
