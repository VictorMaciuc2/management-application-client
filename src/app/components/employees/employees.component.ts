import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  constructor(private employeesservice: EmployeesService) { }
  employees : User[]=[]
  settings = {
    columns: {
      id: {
        title: 'ID',
        hide: true
      },
      email: {
        title: 'Email'
      },
      name: {
        title: 'Name'
      },
      role: {
        title: 'Role'
      },
      seniorityLevel: {
        title: 'Seniority Level'
      },
      department: {
        title: 'Department'
      },
    },
    add:{confirmCreate:true},
    delete:{confirmDelete:true},
    edit:{
      confirmSave:true
     }
  };

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to update?')) {
      this.employeesservice.update(event.newData.id,event.newData.email,event.newData.name,event.newData.role,event.newData.seniorityLevel,event.newData.department)
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.employeesservice.save(event.newData.email,event.newData.name,event.newData.role,event.newData.seniorityLevel,event.newData.department)
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.employeesservice.delete(event.data.id)
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.employeesservice.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      }
  });

  }

}
