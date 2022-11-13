import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'ws-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, body: string },
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
  ) { }

  confirmed() {
    this.dialogRef.close(true)
  }
}
