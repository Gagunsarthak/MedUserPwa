import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { AppSearchRoutingModule } from './app-search-routing.module';
import { AppSearchComponent } from './app-search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { DoctorSearchCardComponent } from './components/doctor-search-card/doctor-search-card.component';
import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppSearchComponent,
    FiltersComponent,
    DoctorSearchCardComponent,
    MapComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    AppSearchRoutingModule,
  ],
  providers: [SearchService],
})
export class AppSearchModule {}
