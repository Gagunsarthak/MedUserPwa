import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IScheduleDetails, ISignUpReq } from 'src/routes/app-user-dashboard/Models/doctor.model';
import { SignupService } from '../../services/signup.service';


@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent implements OnInit {
  confirmPassword=''
 submitted: boolean = false;
//  req:ISignUpReq={
//    fullName: '',
//    mobileNumber: '',
//    password: undefined,
//    dob: undefined,
//    gender: undefined,
//    confirmPassword: undefined
//  }
// ​

   myForm: FormGroup ;
  bothPasswordsMatch: boolean=true;
  phoneNuminUrl: string ='';
  phoneNumAlreadySelected: boolean=false;
  constructor(
    private _snackBar: MatSnackBar,
    private signUpServ:SignupService,
    private router:Router,
    private fb: FormBuilder,
    private activated: ActivatedRoute
  ) {
    this.createForm()
   }

  ngOnInit(): void {
    this.activated.queryParamMap.subscribe(queryParams => {
      // Reset search request object
     
      // query
      if (queryParams.has('num')) {
        this.phoneNuminUrl = queryParams.get('num') || ''
      }
      if(this.phoneNuminUrl.length>0){
        this.phoneNumAlreadySelected=true
        this.myForm.patchValue({
          mobileNumber:this.phoneNuminUrl
        })
        //to disable the num edit field
      //  this.myForm.controls['mobileNumber'].disable();
      }
      // filters
 

    })
   
  
  }
  get f() {
    return this.myForm.controls;
  }
  createForm() {
    this.myForm = this.fb.group({
       fullName: ['', [Validators.required ]],
       email:['',[Validators.required,Validators.email]],
       gender:['male', [Validators.required]],
       dob:['', [Validators.required]],
       mobileNumber:['',[Validators.required ,Validators.min(5), Validators.max(10)]],
       password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required ]],
            acceptTerms: [false, [Validators.requiredTrue]]
    }
   
    );

    /////new approach
    console.log("Form built is ",this.myForm)
  
  }
  createAccount(){
    console.log("The form built is ",this.myForm)
    this.signUpServ.createBasicAccount(this.myForm.value).subscribe((data)=>{
      console.log("Data is ",data)
      this._snackBar.open("Congrats! Your account has been successfully created.", '', {
        duration: 3000
      })
      this.router.navigateByUrl('/home')
    
    },
      
      (err)=>{
        console.log("The rrr is ",err)
        this._snackBar.open("Some error occured. Please retry!", '', {
          duration: 3000
        })
        if(err.error.statuscode=='499'){
          this._snackBar.open("This mobile number is already registered.", '', {
            duration: 5000
          })
        }else{
          this._snackBar.open("Some error occured. Please retry!", '', {
            duration: 3000
          })
        }
        
        console.log("Error is ",err)})
  }
  checkPasswordsmatch(){
    console.log("Event is ",this.myForm.value.confirmPassword)
  
    if(this.myForm.value.confirmPassword.length >=this.myForm.controls['password'].value.length)
    {
      if(this.myForm.controls['confirmPassword'].value===this.myForm.controls['password'].value){
        this.bothPasswordsMatch=true
      }else{
        this.bothPasswordsMatch=false
      }
    }
    
  }
}
