import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    ProjectsComponent,
    ClientsComponent,
    DepartmentsComponent,
    FeedbackComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    FormsModule,
    MatTableModule 
  ],
  providers: [
    LoginGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
