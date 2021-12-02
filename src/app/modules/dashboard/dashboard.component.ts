import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankingService } from 'src/app/core/banking/banking.service';
import { Transaction } from 'src/app/core/banking/banking.types';
import { User } from 'src/app/core/user.types';
import { UserService } from 'src/app/core/user/user.service';
import { DepositComponent } from './deposit/deposit.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

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
    public dialog: MatDialog
  ) {}
  selectedUserId = 0;
  currentBal$ = 0;

  ngOnInit(): void {
    this._route.paramMap.subscribe((val) => {
      this.selectedUserId = parseInt(val.get('id'));
      this.transaction$ = this._bankingService.getTransactionsByUserId(
        this.selectedUserId
      );
      this.currentBal$ = this._bankingService.getCurrentBalanceByUserId(
        this.selectedUserId
      );
    });
  }
  openDepositDialog() {
    const dialogRef = this.dialog.open(DepositComponent, {
      width: '250px',
      data: { userId: this.selectedUserId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //Check For Changes
    });
  }
  openWithdrawDialog() {
    const dialogRef = this.dialog.open(WithdrawComponent, {
      width: '250px',
      data: { userId: this.selectedUserId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
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
    });
  }
}
