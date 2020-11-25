import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
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
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationModal } from './modals/delete-confirmation/delete-confirmation';
import { ClientsService } from './services/clients.service';
import { DepartmentsService } from './services/departments.service';
import { EmployeesService } from './services/employees.service';
import { StorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';
import { ProjectsService } from './services/projects.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentModal } from './modals/department-modal/department-modal';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    ProjectsComponent,
    ClientsComponent,
    DepartmentsComponent,
    FeedbackComponent,
    LoginComponent,
    ClientsListComponent,
    DeleteConfirmationModal,
    DepartmentModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule
  ],
  entryComponents: [
    DeleteConfirmationModal,
    DepartmentModal
  ],
  providers: [
    LoginGuard,
    AuthGuard,
    ClientsService,
    DepartmentsService,
    EmployeesService,
    StorageService,
    LoginService,
    ProjectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
