import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppReviewComponent } from './app-review/app-review.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppStarRatingModule } from '../app-star-rating/app-star-rating/app-star-rating.module';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppReviewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    AppStarRatingModule,
    MatButtonModule
  ],
  exports: [AppReviewComponent],
  entryComponents: [AppReviewComponent],
})
export class AppReviewModule { }
