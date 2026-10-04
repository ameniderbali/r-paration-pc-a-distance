import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { RemoteAccessComponent } from './remote-access/remote-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: UserFormComponent },
  { path: 'remote', component: RemoteAccessComponent },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
