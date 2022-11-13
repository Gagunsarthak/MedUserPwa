import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiStepImportComponent } from '../app-signup/components/multi-step-import/multi-step-import.component';
import { AppProfileComponent } from './app-profile.component';
import { DocFeedbackComponent } from './components/doc-feedback/doc-feedback/doc-feedback.component';
import { ProfileDetailsEditComponent } from './components/profile-details-edit/profile-details-edit.component';

const routes: Routes = [{ path: '', component: AppProfileComponent },{ path: 'details', component: ProfileDetailsEditComponent },
{ path: 'getUserDetails', component: MultiStepImportComponent },
{
  path: 'feedback/:appointmentId',
  component: DocFeedbackComponent,

},


];
// const newPageRoutes: Routes = [{ path: '/details', component: ProfileDetailsEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppProfileRoutingModule {}
