import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserDashboardComponent } from './app-user-dashboard/app-user-dashboard.component';
import { AppUserBookingsComponent } from './components/app-user-bookings/app-user-bookings.component';
import { AppUserFavoriteComponent } from './components/app-user-favorite/app-user-favorite.component';
import { AppUserHomeComponent } from './components/app-user-home/app-user-home.component';
import { AppUserPasswordChangeComponent } from './components/app-user-password-change/app-user-password-change.component';
import { AppUserProfileEditComponent } from './components/app-user-profile-edit/app-user-profile-edit.component';


const routes: Routes = [
  {path: '',  component: AppUserDashboardComponent},
  
  {path: '',pathMatch: 'full' , redirectTo: '/user-dashboard/home'},
  {path: 'home',  component:AppUserHomeComponent },
  {path: 'bookings',  component: AppUserBookingsComponent},
  {path: 'favorite',  component: AppUserFavoriteComponent},
  {path: 'passwordReset',  component: AppUserPasswordChangeComponent},
  {path: 'profileEdit',  component: AppUserProfileEditComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild([   {
    path: '',
    component: AppUserDashboardComponent,
    // resolve: {
    //   content: ModeratorTimelineService,
    // },
    children: routes,
  },])],
  exports: [RouterModule]
})
export class AppUserDashboardRoutingModule { }
