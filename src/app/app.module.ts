import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppProfileComponent } from 'src/routes/app-profile/app-profile.component';
import { RootComponent } from './component/root/root.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

// import { AppNavBarComponent } from './component/app-nav-bar/app-nav-bar.component';
import { AppPublicNavBarComponent } from './component/app-public-nav-bar/app-public-nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppFooterComponent } from './component/app-footer/app-footer.component';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './component/dialog/dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { DialogDeleteComponent } from './component/dialog-delete/dialog-delete.component';
import { DialogLoginRedirectComponent } from './component/dialog-login-redirect/dialog-login-redirect.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { DialogGraphLineComponent } from './component/dialog-graph-line/dialog-graph-line.component';
import { NgChartsModule } from 'ng2-charts';
import { DialogGraphBarComponent } from './component/dialog-graph-bar/dialog-graph-bar.component';
import { DialogAddMedDetailComponent } from './component/dialog-add-med-detail/dialog-add-med-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    // AppComponent
    RootComponent,
    AppFooterComponent,
    // AppNavBarComponent,
    AppPublicNavBarComponent,
    DialogComponent,
    DialogDeleteComponent,
    DialogGraphLineComponent,
    DialogLoginRedirectComponent,
    DialogGraphBarComponent,
    DialogAddMedDetailComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    NgxHideOnScrollModule ,
    MatIconModule,
    NgChartsModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,
    HttpClientModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
