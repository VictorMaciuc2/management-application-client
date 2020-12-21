import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/enums/Role';
import { SeniorityLevel } from 'src/app/enums/SeniorityLevel';
import { DeleteConfirmationModal } from 'src/app/modals/delete-confirmation/delete-confirmation';
import { EmployeeModal } from 'src/app/modals/employee-modal/employee-modal';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { Constants } from 'src/app/utils/constants';
import { User } from '../../models/user';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public dataSource;
  public employees: User[] = [];
  public filterSearch: string;
  public displayedColumns: string[] = ['name', 'email', 'role', 'seniorityLevel', 'department', 'edit', 'delete'];
  public role = Role;
  public seniorityLevel = SeniorityLevel;

  constructor(private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource(this.employees);
    });
  }

  onFilterChanged() {
    this.dataSource = new MatTableDataSource(this.employees.filter(employees => employees.name.includes(this.filterSearch)));
  }

  deleteEmployee(employee) {
    let dialogRef = this.dialog.open(DeleteConfirmationModal);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.employeesService.delete(employee.id).subscribe(_ => {
          this.employees = this.employees.filter(d => d.id != employee.id);
          this.dataSource = new MatTableDataSource(this.employees);
          this.snackBar.open("The employee was deleted", '', { duration: Constants.SECONDS_FOR_SNACKBAR });
        })
      }
    });
  }

  editEmployee(employee: User) {
    this.departmentsService.getDepartments().subscribe(departments => {
      let dialogRef = this.dialog.open(EmployeeModal, {
        data: {
          employee: { ...employee },
          departments: departments
        }
      });

      dialogRef.afterClosed().subscribe(employee => {
        if (employee) {
          this.employeesService.update(employee).subscribe(_ => {
            var indexOfemployees = this.employees.indexOf(this.employees.find(d => d.id == employee.id));
            this.employees[indexOfemployees] = employee;
            this.dataSource = new MatTableDataSource(this.employees);
            this.snackBar.open("The employee was updated", '', { duration: Constants.SECONDS_FOR_SNACKBAR });
          });
        }
      });
    });
  }

  saveEmployee() {
    this.departmentsService.getDepartments().subscribe(departments => {
      let dialogRef = this.dialog.open(EmployeeModal, {
        data: {
          employee: new User(),
          departments: departments
        }
      });

      dialogRef.afterClosed().subscribe(employee => {
        if(employee) {
          this.employeesService.save(employee).subscribe(savedEmployee => {
            this.employees.push(savedEmployee);
            this.dataSource = new MatTableDataSource(this.employees);
            this.snackBar.open("The employee was saved", '', { duration: Constants.SECONDS_FOR_SNACKBAR });
          });
        }
      });
    })
  }
}
