import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModal } from 'src/app/modals/delete-confirmation/delete-confirmation';
import { Department } from 'src/app/models/department';
import { DepartmentsService } from 'src/app/services/departments.service';
import { DepartmentModal } from 'src/app/modals/department-modal/department-modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-departments',
  styleUrls: ['./departments.component.css'],
  templateUrl: './departments.component.html'
})

export class DepartmentsComponent implements OnInit {
  public dataSource;
  public departments: Department[] = [];
  public filterSearch: string;
  public displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];


  constructor(private departmentsService: DepartmentsService, private snackBar : MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe(departaments => {
      this.departments = departaments;
      this.dataSource = new MatTableDataSource(this.departments);
    });
  }

  onFilterChanged() {
    this.dataSource = new MatTableDataSource(this.departments.filter(department => department.name.includes(this.filterSearch)));
  }

  deleteDepartment(department) {
    let dialogRef = this.dialog.open(DeleteConfirmationModal);

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.departmentsService.delete(department.id).subscribe(_ => {
          this.departments = this.departments.filter(d => d.id != department.id);
          this.dataSource = new MatTableDataSource(this.departments);
        })
      }
    });
  }

  editDepartment(department: Department) {
    let dialogRef = this.dialog.open(DepartmentModal, {
      data: {
        department: {...department}
      }
    });

    dialogRef.afterClosed().subscribe(department => {
      this.departmentsService.update(department).subscribe(_ => {
        var indexOfDepartment = this.departments.indexOf(this.departments.find(d => d.id == department.id));
        this.departments[indexOfDepartment] = department;
        this.dataSource = new MatTableDataSource(this.departments);
      });
    });
  }

  saveDepartment() {

    let dialogRef = this.dialog.open(DepartmentModal, {
      data: {
        department: new Department()
      }
    });

    dialogRef.afterClosed().subscribe(department => {
      this.departmentsService.save(department).subscribe(savedDepartment => {
        this.departments.push(savedDepartment);
        this.snackBar.open("Department added", 'ok',{duration:1500});
        this.dataSource = new MatTableDataSource(this.departments);
      });
    }
    );
  }
}
