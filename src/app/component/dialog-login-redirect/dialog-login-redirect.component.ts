import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-dialog-login-redirect',
  templateUrl: './dialog-login-redirect.component.html',
  styleUrls: ['./dialog-login-redirect.component.scss']
})
export class DialogLoginRedirectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DialogDeleteComponent>
  ) { }
  ngOnInit(): void {
  }
  tryNewNum() {
   
    this.dialogRef.close({event:'newNum' });
  }
  signUpNewNum() {
   
    this.dialogRef.close({event:'signUp' });
  }
}
