import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from 'src/routes/app-signup/services/signup.service';

@Component({
  selector: 'app-app-user-password-change',
  templateUrl: './app-user-password-change.component.html',
  styleUrls: ['./app-user-password-change.component.scss']
})
export class AppUserPasswordChangeComponent implements OnInit {
  myForm: FormGroup ;
  confirmPassword=''
  wrongOriginalPwd:boolean=false
  bothPasswordsMatch: boolean=true;
  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private signupServ:SignupService) { 
    this.createForm()
  }


  ngOnInit(): void {
  }
  createForm() {
    this.myForm = this.fb.group({
      mobileNumber:[this.signupServ.mobileNumberLoggedIn||this.signupServ.emailOfLoggedInUser||'9437975834'],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required ],
           
    }
   
    );

    /////new approach
 
  
  }
  checkPasswordsmatch(){
     console.log("Event is ",this.confirmPassword)
     console.log("Confirm pwd val :",this.myForm.controls['confirmPassword'].value)
     console.log(" pwd val :",this.myForm.value.password)

      if(this.myForm.controls['confirmPassword'].value.length >=this.myForm.controls['password'].value.length)
      {
        if(this.myForm.controls['confirmPassword'].value ===this.myForm.controls['password'].value){
          this.bothPasswordsMatch=true
        }else{
          this.bothPasswordsMatch=false
        }
      }
      
    }

    resetPasswordCall(form: FormGroup){
      // this.getDoctorProfileData(this.doctorId)
      // console.log("The form is ",this.myForm.value)
      this.signupServ.resetPasswordAPICall(this.myForm.value).subscribe((data)=>{
        console.log("Successfully Booked")
        this._snackBar.open("Password successfully changed", '', {
          duration: 3000
        })
      },(err)=>{
        console.log("Booking cancelled",err)
        if(err.error.message=='Wrong Password'){
          this.wrongOriginalPwd=true
        }
        this._snackBar.open("Error! Password change failed. Please retry.", '', {
          duration: 3000
        })
      })
    }
}
