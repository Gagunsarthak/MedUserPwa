import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBookinSlotComponent } from './app-bookin-slot/app-bookin-slot.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppBookinSlotComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  exports:[AppBookinSlotComponent]
})
export class AppBookingSlotModule { }
