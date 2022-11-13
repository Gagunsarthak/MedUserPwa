import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocFeedbackComponent } from './doc-feedback/doc-feedback.component';
import { AppStarRatingModule } from 'src/app/component/app-star-rating/app-star-rating/app-star-rating.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DocFeedbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppStarRatingModule
  ]
})
export class DocFeedbackModule { }
