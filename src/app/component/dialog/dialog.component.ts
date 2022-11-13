import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
export interface IDataFromDetail{
  field:String,
  data:any
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent implements OnInit {
  dialogHeader = '';
  type: string;
  addedLangOrSpcl:String[]
  myForm: FormGroup;
  myExpForm: FormGroup;
  myAwardForm: FormGroup;
  myLangSpclForm: FormGroup;
  practiceForm:FormGroup
  //lang
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
 // filteredFruits: Observable<string[]>;
  langorSpcl: string[] = [];
  @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataFromDetails: IDataFromDetail,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.has('type')) {
      this.type = this.activatedRoute.snapshot.queryParamMap.get('type') || '';
      this.dialogHeader = this.type;
    }
    console.log("DialogRef is ",this.dataFromDetails)
   
    this.practiceForm=this.fb.group({
      clinicName: [this.dataFromDetails?.data && this.dataFromDetails.data.clinicName ? this.dataFromDetails.data.clinicName: '', Validators.required],
      location: [this.dataFromDetails?.data && this.dataFromDetails.data.location ? this.dataFromDetails.data.location: '', Validators.required],
      fees: [this.dataFromDetails?.data && this.dataFromDetails.data.fees ? this.dataFromDetails.data.fees: '', Validators.required],
      tagReceived: [this.dataFromDetails?.data && this.dataFromDetails.data.tagReceived ? this.dataFromDetails.data.tagReceived: '', Validators.required],
      schedule: [this.dataFromDetails?.data && this.dataFromDetails.data.schedule ? this.dataFromDetails.data.schedule: '', Validators.required],
    })
this.myLangSpclForm=this.fb.group({
  language:[''],
  specialization:['']
})
this.langorSpcl=this.dataFromDetails  ? this.dataFromDetails.data: ''
//if(this.dataFromDetails?.field){
  this.myForm = this.fb.group({
    institution: [this.dataFromDetails?.data && this.dataFromDetails.data.institution ? this.dataFromDetails.data.institution: '', Validators.required],
    degree: [this.dataFromDetails?.data && this.dataFromDetails.data.degree ? this.dataFromDetails.data.degree: '', Validators.required],
    startDate: [this.dataFromDetails?.data && this.dataFromDetails.data.startDate ? this.dataFromDetails.data.startDate: '', Validators.required],
    endDate: [this.dataFromDetails?.data && this.dataFromDetails.data.endDate ? this.dataFromDetails.data.endDate: '', Validators.required],
    studyField: [this.dataFromDetails?.data && this.dataFromDetails.data.studyField ? this.dataFromDetails.data.studyField: '', Validators.required],
    description: [this.dataFromDetails?.data && this.dataFromDetails.data.description ? this.dataFromDetails.data.description: ''],
  });
//}
// else{
//   this.myForm = this.fb.group({
//     institution: ['', Validators.required],
//     degree: ['', Validators.required],
//     startDate: ['', Validators.required],
//     endDate: ['', Validators.required],
//     studyField: ['', Validators.required],
//     description: [''],
//   });
// }
  

    this.myExpForm = this.fb.group({
      companyName: [this.dataFromDetails?.data && this.dataFromDetails.data.companyName ? this.dataFromDetails.data.companyName: '', Validators.required],
      location: [this.dataFromDetails?.data && this.dataFromDetails.data.location ? this.dataFromDetails.data.location: '', Validators.required],
      startDate: [this.dataFromDetails?.data && this.dataFromDetails.data.startDate ? this.dataFromDetails.data.startDate: '', Validators.required],
      endDate: [this.dataFromDetails?.data && this.dataFromDetails.data.endDate ? this.dataFromDetails.data.endDate: '', Validators.required],
      title: [this.dataFromDetails?.data && this.dataFromDetails.data.title ? this.dataFromDetails.data.title: '', Validators.required],
      description: [this.dataFromDetails?.data && this.dataFromDetails.data.description ? this.dataFromDetails.data.description: ''],
    });
    this.myAwardForm = this.fb.group({
      awardName: [this.dataFromDetails?.data && this.dataFromDetails.data.awardName ? this.dataFromDetails.data.awardName: '', Validators.required],
      place: [this.dataFromDetails?.data && this.dataFromDetails.data.place ? this.dataFromDetails.data.place: '', Validators.required],
      date: [this.dataFromDetails?.data && this.dataFromDetails.data.date ? this.dataFromDetails.data.date: '', Validators.required],
    });
    console.log("Mypract form is ",this.practiceForm)
  }
  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.institution);
    // console.log('Email', form.value.degree);
    // console.log('Message', form.value.message);
    this.dialogRef.close({ event: this.dialogHeader, data: this.myForm });
  }
  onExpSubmit(form: FormGroup) {
    this.dialogRef.close({ event: this.dialogHeader, data: this.myExpForm });
  }
  onAwardSubmit(form: FormGroup) {
    this.dialogRef.close({ event: this.dialogHeader, data: this.myAwardForm });
  }
  onpracticeDetail(form: FormGroup) {
    this.dialogRef.close({ event: this.dialogHeader, data: this.practiceForm });
  }
  submitLangOrSpclData(){
    if(this.type=='Language' ){
      console.log("frtt",this.langorSpcl)
      this.myLangSpclForm.patchValue({
        language: this.langorSpcl, 
        // formControlName2: myValue2
      });
    }else if(this.type=='Specialization'){
      
      this.myLangSpclForm.patchValue({
        specialization: this.langorSpcl, 
        // formControlName2: myValue2
      });
    }
    this.dialogRef.close({ event: this.dialogHeader, data: this.myLangSpclForm });
//this.myLangSpclForm.controls.get('language').setValue(this,this.fruitCtrl)
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
console.log("Event is ",event)
    // Add our fruit
    if (value) {
      this.langorSpcl.push(value);
      console.log("ADD EVENT ",this.langorSpcl)
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.langorSpcl.indexOf(fruit);

    if (index >= 0) {
      this.langorSpcl.splice(index, 1);
    }
  }


}
