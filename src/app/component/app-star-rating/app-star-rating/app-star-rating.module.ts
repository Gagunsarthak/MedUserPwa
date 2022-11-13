import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStarRatingComponent } from '../app-star-rating.component';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [AppStarRatingComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
   
  ],
  exports: [AppStarRatingComponent],
  entryComponents: [AppStarRatingComponent],
})
export class AppStarRatingModule { }
