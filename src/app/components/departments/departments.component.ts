import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import {DepartmentsService} from '../../services/departments.service'
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [DepartmentsService]
})
export class DepartmentsComponent implements OnInit {

  constructor(private departmentsService: DepartmentsService) { }
  _listFilter = '';
 
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepartaments = this.listFilter ? this.performFilter(this.listFilter) : this.departaments;}
    filteredDepartaments: Department[] = [];
    departaments: Department[] = [];
  
    performFilter(filterBy: string): Department[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.departaments.filter((department: Department) =>
      department.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    delete(): void{}
    edit(): void{}

    ngOnInit(): void {
      this.departmentsService.getDepartments().subscribe({
        next: departaments => {
          this.departaments = departaments;
          console.log(departaments)
        this.filteredDepartaments = this.departaments;
        }
      //  error: err => this.errorMessage = err
      });
    }
  }

