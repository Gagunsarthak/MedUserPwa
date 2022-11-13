import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSearchComponent } from './app-search.component';


const routes: Routes = [
  {path: '',  component: AppSearchComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSearchRoutingModule { }
