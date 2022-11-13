import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { SignupService } from '../../services/signup.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginRedirectComponent } from 'src/app/component/dialog-login-redirect/dialog-login-redirect.component';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const   config= {
  projectId: 'medapp-24a06',
  appId: '1:216639233543:web:aba0c640da3087b203d4a2',
  storageBucket: 'medapp-24a06.appspot.com',
  apiKey: 'AIzaSyB0saRsBjShlx2P5LL1kLgVZ4p5Tddg1b4',
  authDomain: 'medapp-24a06.firebaseapp.com',
  messagingSenderId: '216639233543',
}

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {
  otpFieldEnabled=false
  otp: string; showOtpComponent = true; 
  loginForm: FormGroup ;
  otpLength=6
  otpValidated:boolean=false
  phoneNumEntered=''
  showAlert={
    visible:false,
    message:'',
    token:''
  }
  authin:any
  appVerifier:any
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
   config = { allowNumbersOnly: true, length: this.otpLength, isPasswordInput: false, disableAutoFocus: false, placeholder: "", inputStyles: { width: "50px", height: "50px", color:'#18e4c4'}, }; 
  isSignedinUser: boolean=false;
  confirmationResult: any;
  recaptchaWidgetId: any;
  signedInUserId: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  
    private router:Router,
    private signUpServ:SignupService,
   // public auth: AngularFireAuth
   
  ) { 
//      this.authin = getAuth();
//     this.appVerifier = new RecaptchaVerifier('recaptcha-container', {
//   'size': 'normal',
//   'callback': (response:any) => {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     // ...
//   },
//   'expired-callback': () => {
//     // Response expired. Ask user to solve reCAPTCHA again.
//     // ...
//   }
// }, this.authin);

  
    this.createForm()
  }

  ngOnInit(): void {
    firebase.initializeApp(config);
  this.showAlert={
      visible:false,
      message:'',
      token:''
    }
  }


  onOtpChange(otp: any) {
    console.log("The event is ",otp)
    console.log("log in form ios ",this.loginForm)
if(otp.length>=this.otpLength){
  this.verifyOtp(otp)
  //the logic to validate otp will go here i.e otp sent to phone an dotp entered matches
  if(this.otpValidated){
   
    // localStorage.setItem('id_token', data.token);
    // this.signUpServ.isUserLoggedIn=true
    // this.router.navigateByUrl('/home');
  }

} }
  verifyOtp(otp: any) {
    console.log("VerifyOtp called")
    let veifiedOTP=true
    this.confirmationResult.confirm(otp).then((result:any) => {
      // User signed in successfully.
      veifiedOTP=true
      const user = result.user;

      // ...
    }).catch((error:any) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  //  console.log("Confirm res is ",this.confirmationResult)
if(veifiedOTP){
  //login the user using loginwithotp function
  const req={
    id:this.signedInUserId ||"60927910-3dcf-11ed-8b32-bfe0f1717d29",
    mobileNumber:this.phoneNumEntered ||7999411517
  }
  this.signUpServ.logInUsingOTP(req).subscribe((data:any)=>{
    console.log("Logged in successfully through otp",data)
    localStorage.setItem('id_token', data.token);
  },(err:any)=>{
    console.log("Eroor Logged in  through otp",err)

  })
}

  }

  sendOtp(){
    this.otpFieldEnabled=true
    this.phoneNumEntered=this.loginForm.value.mobileNumber
    this.signUpServ.checNumExists({phoneNumber:this.phoneNumEntered}).subscribe((data)=>{
      if(data.numPresent){
        this.isSignedinUser=true
        this.signedInUserId=data.userId
      }else{
        this.isSignedinUser=false
        this.openDialog()

      }
      if(this.isSignedinUser){
        //firebase to trigger otp into the phone here
        this.createOTP()
   
        this._snackBar.open("OTP is successfully sent to "+this.phoneNumEntered, '', {
          duration: 5000
        })
      }else if(!this.isSignedinUser){
        //show dialog asking for another number or proceed with the same number
        this.openDialog()

      }

      this.ngOtpInput.setValue('')
    },(err)=>{
      console.log(err)
   
      this._snackBar.open("Some Error Occured! Please retry.", '', {
        duration: 3000
      })
      this.ngOtpInput.setValue('')
      
    })
  }
  createForm() {
    this.loginForm = this.fb.group({
      mobileNumber:['',Validators.required],
       password: ['', [Validators.required]]
        
      
    }
   
    );

    /////new approach
    console.log("Form built is ",this.loginForm)
  
  }
  onSubmit(form: FormGroup) {
//     if(this.isSignedinUser==false){
// return
//     }
    // true or false
 console.log("form is ",form)
    
    this.signUpServ.logIn(form.value).subscribe((data)=>{
      console.log("Data is ",data)
      localStorage.setItem('id_token', data.token);
      this.signUpServ.isUserLoggedIn=true
      this.signUpServ.userId=data.userId
      this._snackBar.open("Successfully Logged In", '', {
        duration: 3000
      })
      
  },(err)=>{
    console.log("The error is ",err)
    if(err.error.statuscode=='401'){
      this.showAlert.message="Retry with correct LogIn credentails."
      this.showAlert.token='Invalid Log IN'
      this.showAlert.visible=true
    }else{
      this._snackBar.open("Error! Please try again", '', {
        duration: 3000
      });
    }
 
    
 })

  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogLoginRedirectComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: `, JSON.stringify(result));
      if(result.event=='signUp'){
      //  this.router.navigate
      this.router.navigate(['signUp/register'], { queryParams: {num :this.phoneNumEntered}})

      }else  if(result.event=='newNum'){
this.phoneNumEntered=''
this.loginForm.patchValue(
  {
    mobileNumber:''
  }
)
      }
    });
  }
createOTP(){
  console.log("create otp called")
  this.appVerifier= new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response:any) => {
      console.log("the response is ",response)
      // reCAPTCHA solved, allow signInWithPhoneNumber.
     // onSignInSubmit();
    }
  });
  this.appVerifier.render().then((widgetId:any )=> {
    this.recaptchaWidgetId = widgetId;
  });
  console.log("recaptcha widget id is ",this.recaptchaWidgetId)
  firebase.auth().signInWithPhoneNumber('+91'+this.phoneNumEntered,this.appVerifier).then((confirmationResult: any) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
   // window.confirmationResult = confirmationResult;
   console.log("Confirmation resuklt is",confirmationResult )
   this.confirmationResult= confirmationResult
    // ...
  }).catch((error:any) => {
    // Error; SMS not sent
    // ...
    
    console.log("Error in otp is",error )
  });
  this.appVerifier.clear()
}
}


