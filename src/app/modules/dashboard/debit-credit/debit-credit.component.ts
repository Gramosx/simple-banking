import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankingService } from 'src/app/core/banking/banking.service';
import { Transaction } from 'src/app/core/banking/banking.types';
import { user } from 'src/app/core/data';
import { User } from 'src/app/core/user.types';

@Component({
  selector: 'app-debit-credit',
  templateUrl: './debit-credit.component.html',
  styleUrls: ['./debit-credit.component.scss'],
})
export class DebitCreditComponent implements OnInit {
  transForm: FormGroup;
  user: User[];
  currentBal: number = 0;
  constructor(
    public dialogRef: MatDialogRef<DebitCreditComponent>,
    private _formBuilder: FormBuilder,
    private _bankingService: BankingService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number; type: boolean } // False for Debit , True for Credit
  ) {}

  ngOnInit(): void {
    this.user = user.filter((x) => x.id != this.data.userId);
    this.currentBal = this._bankingService.getCurrentBalanceByUserId(
      this.data.userId
    );
    this.transForm = this._formBuilder.group({
      amount: [null, Validators.required],
    });
  }

  submit() {
    //Validate Form
    this.transForm.markAllAsTouched();
    if (this.transForm.invalid) return console.log('invalid Form');

    //Chec for Debit Type or Credit
    //Submit Data
    try {
      if (this.data.type)
        this._bankingService.createCreditTransaction(
          this.data.userId,
          this.transForm.value.amount
        );
      else
        this._bankingService.createDebitTransaction(
          this.data.userId,
          this.transForm.value.amount
        );
      this.dialogRef.close();
      this._snackBar.open('Transcation Complete')._dismissAfter(2000);
    } catch (err) {
      this._snackBar.open(err)._dismissAfter(2000);
      console.log(err);
    }
  }
}
