import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankingService } from 'src/app/core/banking/banking.service';
import { Transaction } from 'src/app/core/banking/banking.types';
import { User } from 'src/app/core/user.types';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transaction$: Observable<Transaction[]>;

  constructor(
    private _route: ActivatedRoute,
    private _bankingService: BankingService
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
}
