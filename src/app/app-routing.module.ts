import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import {Role} from './enums/role';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent, canActivate: [AuthGuard]},
  { path: 'clients', component: ClientsComponent, canActivate:[AuthGuard, RoleGuard]},
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
