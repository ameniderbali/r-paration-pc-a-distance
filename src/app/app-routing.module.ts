import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RemoteAccessComponent } from './remote-access/remote-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  { path: 'new-request', component: UserFormComponent,
    canActivate: [AuthGuard], data: { roles: ['CLIENT', 'ADMIN'] } },
  { path: 'remote', component: RemoteAccessComponent,
    canActivate: [AuthGuard], data: { roles: ['CLIENT', 'ADMIN'] } },
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard], data: { roles: ['TECHNICIAN', 'ADMIN'] } },

  { path: '', redirectTo: 'new-request', pathMatch: 'full' },
  { path: '**', redirectTo: 'new-request' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}