import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-multi-step-import',
  templateUrl: './multi-step-import.component.html',
  styleUrls: ['./multi-step-import.component.scss']
})
export class MultiStepImportComponent implements OnInit {
  myForm: FormGroup ;
  medicalDetailsForm: FormGroup ;
  separatorKeysCodes: number[] = [ENTER, COMMA,SPACE];
  langCtrl = new FormControl('');
  allerCtrl=new FormControl('');
  chronDiseaseCtrl=new FormControl('');
  procedureCtrl=new FormControl('');
  langs: String[] = ['Hindi'];
  allergies:String[]=['None']
  procedures:any[]=[{name:'None'}]
  chronicDisease:any[]=[{name:'None'}]
  stateList:String[]=["Andhra Pradesh","Arunachal Pradesh","Assam", "Bihar",
  "Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand",
  " Uttar Pradesh","West Bengal"
   ]
   bloodGroupList:String[]=["A+", "A-", "B-"	, "AB+"	, "AB-"	, "O+"	, "O-" ]
   color1=''
   color2=''
   color3=''
   formToBeDisplayed: 'Personal' | 'Medical'|'Insurance'  = 'Personal'
  @ViewChild('langInput') langInput: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder,private signUpserv:SignupService, private _snackBar: MatSnackBar,) { 
    this.createForm()
  }
  createForm() {
    this.myForm = this.fb.group({
       smoker: [''],
       alcohol: [''],
       language:[this.langs],
       state:[''],
       zipcode:[''],
       city:[''],

    })
    this.medicalDetailsForm = this.fb.group({
      blood_donor: [false],
      blood_group: [''],
      allergies:[this.allergies],
      pre_existing_conditions:[this.chronicDisease],
      past_procedures:[this.procedures],
    

   }
   
    )

 

    /////new approach
    console.log("Form built is ",this.myForm)
  
  }
  ngOnInit(): void {
    this.langs = ['Hindi'];
    this.color1='#18e4c4'
    this.changeColor(1)
    this.fetchFilledData()
  }
  fetchFilledData(){
    const req={
      id:this.signUpserv.userId!||1,

      role:"user",
  
      fields:["medical_records","Zipcode","state","language","city","blood_donor"]

    }
    this.signUpserv.fetchUserDetails(req).subscribe((data)=>{
      console.log("Data received for user is ",data.results[0])
      let dataReceived=data.results[0]
      //this.langs=data.language
      this.allergies=dataReceived.medical_records.allergies
      this.procedures=dataReceived.medical_records.past_procedures
      console.log("Past procedure is ",this.procedures)
      this.chronicDisease=dataReceived.medical_records.pre_existing_conditions
      this.myForm = this.fb.group({
        smoker: [dataReceived.medical_records.smoker||'' ],
        alcohol: [dataReceived.medical_records.alcohol_user||'' ],
        language:[this.langs],
        state:[dataReceived.state||''],
        zipcode:[dataReceived.Zipcode ||''],
        city:[dataReceived.city||''],
 
     })
     this.medicalDetailsForm = this.fb.group({
      blood_donor: [dataReceived.blood_donor|| false],
      blood_group: [dataReceived.medical_records.blood_group||'' ],
      allergies:[dataReceived.medical_records.allergies||this.allergies],
      pre_existing_conditions:[this.chronicDisease],
      past_procedures:[this.procedures],
    

   })
    },(err)=>{
      this.createForm()
    })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our lang
    if (value) {
      this.langs.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.langCtrl.setValue(null);
  }
  addAllergy(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our lang
    if (value) {
      this.allergies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.allerCtrl.setValue(null);
  }
  addMedProcedure(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our lang
    if (value) {
      this.procedures.push({name:value,date:null});
    }

    // Clear the input value
    event.chipInput!.clear();

    this.procedureCtrl.setValue(null);
  }
  addDisease(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our lang
    if (value) {
      this.chronicDisease.push({name:value,duration:null});
    }

    // Clear the input value
    event.chipInput!.clear();

    this.chronDiseaseCtrl.setValue(null);
  }
  remove(lang: String): void {
    const index = this.langs.indexOf(lang);

    if (index >= 0) {
      this.langs.splice(index, 1);
    }
  }
  removeAllergy(allergy:String):void{
    const index = this.allergies.indexOf(allergy);

    if (index >= 0) {
      this.allergies.splice(index, 1);
    }
  }
  removeDisease(disease:String):void{
    const index = this.chronicDisease.indexOf(disease);

    if (index >= 0) {
      this.chronicDisease.splice(index, 1);
    }
  }
  removeProcedure(procedure:String):void{
    const index = this.procedures.indexOf(procedure);

    if (index >= 0) {
      this.procedures.splice(index, 1);
    }
  }

  onPersonalDetailSubmit(form: FormGroup){
    console.log("form is ",form)
    const personalDetailReq={
      medical_records:{

        smoker:form.value.smoker,
        alcohol_user:form.value.alcohol

    }, 
   
      language:form.value.language || this.langs,
     id:this.signUpserv.userId||1,
     role:'user',
       state:form.value.state,
      Zipcode:form.value.zipcode,
      city:form.value.city
    }
    this.signUpserv.updateDetails(personalDetailReq).subscribe((data)=>{
      this._snackBar.open("Successfully Saved Personal Details", '', {
        duration: 3000
      })
      this.changeColor(2)
      this.formToBeDisplayed='Medical'
    },(err)=>{
      this._snackBar.open("Error! Could not save, Retry", '', {
        duration: 3000
      })
    })
   this.formToBeDisplayed='Medical'
   this.changeColor(1)
  }
  onMedDetailSubmit(form: FormGroup){
    console.log("Med form is ",form)
    const medDetailReq={
      id:this.signUpserv.userId||1,
      role:'user',
      blood_donor: form.value.blood_donor,
      medical_records:{

      
      blood_group: form.value.blood_group,
      allergies:form.value.allergies,
     pre_existing_conditions:this.chronicDisease,
      past_procedures:this.procedures,

    }, 
   
    //   language:form.value.language || this.langs,
    
    //    state:form.value.state,
    //   Zipcode:form.value.zipcode,
    //   city:form.value.city
    }
    this.signUpserv.updateDetails(medDetailReq).subscribe((data)=>{
      this._snackBar.open("Successfully Saved Medical Details", '', {
        duration: 3000
      })
      this.changeColor(3)
      this.formToBeDisplayed='Insurance'
    },(err)=>{
      this._snackBar.open("Error! Could not save, Retry", '', {
        duration: 3000
      })
    })
  }
  changeForm(formType:String){

  }
  changeColor(num:number){
  if(num==1){
this.color1='#18e4c4'
this.color2=''
this.color3=''

  }else if(num==2){
    this.color2='#18e4c4'
    //this.color1=''
this.color3=''
  }
  else if(num==3){
    this.color3='#18e4c4'
    this.color1='#18e4c4'
    this.color2='#18e4c4'
    
  }
  }
}
