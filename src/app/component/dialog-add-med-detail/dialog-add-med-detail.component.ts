import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-med-detail',
  templateUrl: './dialog-add-med-detail.component.html',
  styleUrls: ['./dialog-add-med-detail.component.scss']
})
export class DialogAddMedDetailComponent implements OnInit {
  medDetForm: FormGroup; 
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, body: string },
    private dialogRef: MatDialogRef<DialogAddMedDetailComponent>,
  ) { }
  ngOnInit(): void {
    this.medDetForm = this.fb.group({  
      'bmi' : [null ],  
      'heartRate' : [null],  
      'fbcStatus' : [null],  
      'weight' : [null ],  
     
    });  
   // throw new Error('Method not implemented.');
  }
  onFormSubmit(form:NgForm)  
  {  
    console.log(form);  
    this.dialogRef.close({ data: form });
  }  
  // confirmed() {
   
  // }
}
