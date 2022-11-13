import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiStepImportComponent } from './multi-step-import.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [MultiStepImportComponent],
  imports: [
    CommonModule,
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule ,
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
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[MultiStepImportComponent]
})
export class MultiStepImportModule { }
