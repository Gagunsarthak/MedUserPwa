import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { AppSignupRoutingModule } from './app-signup-routing.module';
import { AppSignupComponent } from './app-signup.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppRegisterComponent } from './components/app-register/app-register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppAccountResetComponent } from './components/app-account-reset/app-account-reset.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppSignupComponent,
    AppLoginComponent,
    
    AppRegisterComponent,
         AppAccountResetComponent,
       //  MultiStepImportComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule ,
    MatDatepickerModule,
    RouterModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule,
    MatChipsModule,
    MatNativeDateModule ,
    NgOtpInputModule,
    FormsModule,
    provideAuth(() => getAuth()),
    ReactiveFormsModule,
    AppSignupRoutingModule
  ],
   providers: [  
    MatDatepickerModule,  
  ]
})
export class AppSignupModule { }
