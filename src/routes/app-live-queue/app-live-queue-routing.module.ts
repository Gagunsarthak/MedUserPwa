import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLiveQueueComponent } from './app-live-queue/app-live-queue.component';

const routes: Routes = [
  { path: '', component: AppLiveQueueComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLiveQueueRoutingModule { }
