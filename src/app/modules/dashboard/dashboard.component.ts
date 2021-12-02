import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankingService } from 'src/app/core/banking/banking.service';
import { Transaction } from 'src/app/core/banking/banking.types';
import { DebitCreditComponent } from './debit-credit/debit-credit.component';
import { TransferComponent } from './transfer/transfer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transaction$: Observable<Transaction[]>;

  constructor(
    private _route: ActivatedRoute,
    private _bankingService: BankingService,
    public dialog: MatDialog,
    private _change: ChangeDetectorRef
  ) {}
  selectedUserId = 0;
  _currentBal: number = 0;

  ngOnInit(): void {
    this._route.paramMap.subscribe((val) => {
      this.selectedUserId = parseInt(val.get('id'));
      this.transaction$ = this._bankingService.getTransactionsByUserId(
        this.selectedUserId
      );
      this._currentBal = this._bankingService.getCurrentBalanceByUserId(
        this.selectedUserId
      );
    });
  }
  get currentBal() {
    return this._currentBal;
  }

  //False for Debit ,True for credit
  openDialog(type: boolean) {
    const dialogRef = this.dialog.open(DebitCreditComponent, {
      width: '250px',
      data: { userId: this.selectedUserId, type: type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this._currentBal = this._bankingService.getCurrentBalanceByUserId(
        this.selectedUserId
      );
      //Check For Changes
    });
  }
  openTransferDialog() {
    const dialogRef = this.dialog.open(TransferComponent, {
      width: '250px',
      data: { userId: this.selectedUserId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //Check For Changes
      this._currentBal = this._bankingService.getCurrentBalanceByUserId(
        this.selectedUserId
      );
    });
  }
}
