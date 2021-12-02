import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoute } from './dashboard.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransferComponent } from './transfer/transfer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
@NgModule({
  declarations: [
    DashboardComponent,
    TransactionTableComponent,
    TransferComponent,
    WithdrawComponent,
    DepositComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoute),
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
  ],
})
export class DashboardModule {}
