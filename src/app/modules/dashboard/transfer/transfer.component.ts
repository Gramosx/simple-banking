import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankingService } from 'src/app/core/banking/banking.service';
import { user } from 'src/app/core/data';
import { User } from 'src/app/core/user.types';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  transForm: FormGroup;
  user: User[];
  currentBal: number = 0;
  constructor(
    public dialogRef: MatDialogRef<TransferComponent>,
    private _formBuilder: FormBuilder,
    private _bankingService: BankingService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {}

  ngOnInit(): void {
    this.user = user.filter((x) => x.id != this.data.userId);
    this.currentBal = this._bankingService.getCurrentBalanceByUserId(
      this.data.userId
    );
    this.transForm = this._formBuilder.group({
      to: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  submit() {
    //Validate Form
    this.transForm.markAllAsTouched();
    if (this.transForm.invalid) return console.log('invalid Form');

    let dt = this.transForm.value;
    //Submit Data
    try {
      this._bankingService.createTransferTransaction(
        this.data.userId,
        dt.to,
        dt.amount
      );

      this.dialogRef.close();
      this._snackBar.open('Transcation Complete')._dismissAfter(2000);
    } catch (err) {
      this._snackBar.open(err)._dismissAfter(2000);
      console.log(err);
    }
    //Inform User
  }
}
