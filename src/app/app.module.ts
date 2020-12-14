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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationModal } from './modals/delete-confirmation/delete-confirmation';
import {ProjectModal} from './modals/project-modal/project-modal';
import { ClientsService } from './services/clients.service';
import { DepartmentsService } from './services/departments.service';
import { EmployeesService } from './services/employees.service';
import { StorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';
import { ProjectsService } from './services/projects.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentModal } from './modals/department-modal/department-modal';
import { MatInputModule } from '@angular/material/input';
import { ClientModal } from './modals/client-modal/client-modal';
import { ConfigService } from './utils/config';
import { EmployeeModal } from './modals/employee-modal/employee-modal';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FeedbackModal } from './modals/feedback-modal/feedback-modal';
import { MatRadioModule } from "@angular/material/radio";

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
    DeleteConfirmationModal,
    DepartmentModal,
    ClientModal,
    EmployeeModal,
    ProjectModal,
    FeedbackModal
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
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    DeleteConfirmationModal,
    DepartmentModal,
    ClientModal,
    EmployeeModal
  ],
  providers: [
    LoginGuard,
    AuthGuard,
    ClientsService,
    DepartmentsService,
    EmployeesService,
    StorageService,
    LoginService,
    ProjectsService,
    ConfigService
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
