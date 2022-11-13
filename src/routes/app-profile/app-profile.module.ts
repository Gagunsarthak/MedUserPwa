import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProfileComponent } from './app-profile.component';
import { AppProfileRoutingModule } from './app-profile-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProfileDetailsEditComponent } from './components/profile-details-edit/profile-details-edit.component';
import { AppReviewModule } from 'src/app/component/app-review/app-review.module';
import { AppStarRatingModule } from 'src/app/component/app-star-rating/app-star-rating/app-star-rating.module';
import { DocFeedbackModule } from './components/doc-feedback/doc-feedback.module';
import { MultiStepImportModule } from '../app-signup/components/multi-step-import/multi-step-import.module';
import { AppBookingSlotModule } from 'src/app/component/app-booking-slot/app-booking-slot.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
@NgModule({
  declarations: [
    AppProfileComponent,
   
    ProfileDetailsEditComponent
  ],
  imports: [
    AppProfileRoutingModule,
    MatCardModule,
    MatBottomSheetModule,
    CommonModule,
    AppStarRatingModule,
    AppReviewModule,
    MatIconModule,
    MatChipsModule,
    AppBookingSlotModule,
    MatDividerModule,
    HttpClientModule,
    DocFeedbackModule,
    MultiStepImportModule,
    MatButtonModule,
    MatButtonToggleModule,
    RouterModule,
    MatTabsModule,
    NgxHideOnScrollModule ,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    
  ],
  
})
export class AppProfileModule {
  constructor(){
    console.log("Reached app profile module")
  }
  
 }
