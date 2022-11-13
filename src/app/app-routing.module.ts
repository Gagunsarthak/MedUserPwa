import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: 'profile',
    loadChildren: () => import('../routes/app-profile/app-profile.module').then(m => m.AppProfileModule)
  },
  {
    path: 'signUp',
    loadChildren: () => import('../routes/app-signup/app-signup.module').then(m => m.AppSignupModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../routes/app-search/app-search.module').then(m => m.AppSearchModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../routes/app-home/app-home.module').then(m => m.AppHomeModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('../routes/app-user-dashboard/app-user-dashboard.module').then(m => m.AppUserDashboardModule)
  },
  // {
  //   path: 'live-queue',
  //   loadChildren: () => import('../routes/app-live-queue/app-live-queue.module').then(m => m.AppLiveQueueModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling:'enabled',
    scrollPositionRestoration:'top',
    urlUpdateStrategy:'eager',
    relativeLinkResolution:'legacy'

  })],
  exports: [RouterModule],
  
})
export class AppRoutingModule {
  
 }
