import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppStarRatingModule } from 'src/app/component/app-star-rating/app-star-rating/app-star-rating.module';


@NgModule({
  declarations: [
    AppHomeComponent
  ],
  imports: [
    CommonModule,
  
    AppHomeRoutingModule
  ]
})
export class AppHomeModule { }
