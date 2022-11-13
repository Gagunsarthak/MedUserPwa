import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSignupComponent } from './app-signup.component';
import { AppAccountResetComponent } from './components/app-account-reset/app-account-reset.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppRegisterComponent } from './components/app-register/app-register.component';
import { MultiStepImportComponent } from './components/multi-step-import/multi-step-import.component';


const routes: Routes = [
  

  {path: '',pathMatch: 'full' , redirectTo: '/signUp/login'},
  {path: 'login',  component: AppLoginComponent},
  {path: 'register',  component: AppRegisterComponent},
  {path: 'reset',  component: AppAccountResetComponent},
 // {path: 'getUserDetails',  component: MultiStepImportComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild([   {
    path: '',
    component: AppSignupComponent,
  
    children: routes,
  },]),

],
  exports: [RouterModule]
})
export class AppSignupRoutingModule { }
