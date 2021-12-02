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
@NgModule({
  declarations: [DashboardComponent, TransactionTableComponent, TransferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoute),
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
  ],
})
export class DashboardModule {}