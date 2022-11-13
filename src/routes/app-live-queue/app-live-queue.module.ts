import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLiveQueueRoutingModule } from './app-live-queue-routing.module';
import { AppLiveQueueComponent } from './app-live-queue/app-live-queue.component';
import { MatTabsModule } from '@angular/material/tabs';
//import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppLiveQueueComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    
   // NgxScannerQrcodeModule,
    AppLiveQueueRoutingModule
  ]
})
export class AppLiveQueueModule { }
