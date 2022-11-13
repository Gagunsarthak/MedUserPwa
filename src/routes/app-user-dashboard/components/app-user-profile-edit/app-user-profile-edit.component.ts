import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from 'src/routes/app-signup/services/signup.service';

@Component({
  selector: 'app-app-user-profile-edit',
  templateUrl: './app-user-profile-edit.component.html',
  styleUrls: ['./app-user-profile-edit.component.scss']
})
export class AppUserProfileEditComponent implements OnInit {
  profileForm: FormGroup ;
  constructor(private fb:FormBuilder,private signUpServ:SignupService,private _snackBar: MatSnackBar,
    ) { }
  editMode=false
  first_name=''
  last_name=''
  DOB=''
  email=''
  blood_group=''
  mobile=''
  address=''
   city=''
   state=''
   country=''
   Zipcode=''
  ngOnInit(): void {


    this.createForm()
    if(!this.editMode){
      this.profileForm.controls['first_name'].disable();
      this.profileForm.controls['last_name'].disable();
      this.profileForm.controls['DOB'].disable();
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['medical_records'].disable();
      this.profileForm.controls['mobile'].disable();
      this.profileForm.controls['address'].disable();
      this.profileForm.controls['city'].disable();
      this.profileForm.controls['state'].disable();
      this.profileForm.controls['country'].disable();
      this.profileForm.controls['Zipcode'].disable();


    }
  }
  createForm() {
    this.profileForm = this.fb.group({
      id:[this.signUpServ.id||'1'],  //hard coded values to be removed
      role:['user'],
      first_name:[this.first_name,Validators.required],
      last_name: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      medical_records:this.fb.group({ // make a nested group
        blood_group:[this.blood_group,Validators.required]
      }),
      // medical_records:{
      //   blood_group:['',Validators.required] },
         //nested field
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city:['',Validators.required],  //nested field
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      Zipcode: ['', [Validators.required]],

      
    }
   
    );

    /////new approach
    console.log("Form built is ",this.profileForm)
  this.fetchUserDetails()
  }
  fetchUserDetails() {
  const req={
    "id":[this.signUpServ.userId||1],

    "role":"user",

   "fields":["first_name","last_name","DOB","email","medical_records","mobile","address",
   "city","state","country","Zipcode"
  ]
  }

  this.signUpServ.fetchUserDetails(req).subscribe((data)=>{
    console.log("the data of profile edit is",data.results[0])
    const dataRec=data.results[0]
    this.first_name=dataRec.first_name
    this.last_name=dataRec.last_name
  this.DOB=dataRec.DOB
  this.email=dataRec.email
  this.blood_group=dataRec.medical_records.blood_group
  this.mobile=dataRec.mobile
  this.address=dataRec.address
   this.city=dataRec.city
   this.state=dataRec.state
   this.country=dataRec.country
   this.Zipcode=dataRec.Zipcode
    this.profileForm.patchValue({
      first_name:dataRec.first_name,
      last_name: dataRec.last_name,
      DOB: dataRec.dob,
      email:dataRec.email,
      medical_records:{
        blood_group:dataRec.medical_records.blood_group
      } ,  //nested field
      mobile: dataRec.mobile,
      address: dataRec.address,
      city:dataRec.city,
      state: dataRec.state,
      country: dataRec.country,
      Zipcode: dataRec.Zipcode    })
  },(err)=>{
    this._snackBar.open("Profile data loading failed ! Retry", '', {
      duration: 5000
    })

  })
  }
  enableEditMode(){
    console.log("Edit mode called")
    this.editMode=!this.editMode
    if(this.editMode){
      this.profileForm.controls['first_name']. enable();
      this.profileForm.controls['last_name']. enable();
      this.profileForm.controls['DOB']. enable();
      this.profileForm.controls['email']. enable();
      this.profileForm.controls['medical_records']. enable();
      this.profileForm.controls['mobile']. enable();
      this.profileForm.controls['address']. enable();
      this.profileForm.controls['city']. enable();
      this.profileForm.controls['state']. enable();
      this.profileForm.controls['country']. enable();
      this.profileForm.controls['Zipcode']. enable();


    }
  }
  saveChanges(){
console.log("Save changes called",this.profileForm)
    this.signUpServ.updateDetails(this.profileForm.value).subscribe((data)=>{
      console.log("Data updated successfully")
      this._snackBar.open("Profile data successfully updated !", '', {
        duration: 3000
      })
    },(err)=>{
      console.log("Err")
      this._snackBar.open("Some error occured. Please try again", '', {
        duration: 3000
      })
    })
  }
}
