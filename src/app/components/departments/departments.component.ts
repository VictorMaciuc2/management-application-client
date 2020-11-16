import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentsService } from '../../services/departments.service'
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [DepartmentsService]
})
export class DepartmentsComponent implements OnInit {

  constructor(private departmentsService: DepartmentsService) { }
  _listFilter = '';
  id: String;
  name: String;
  description: String;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepartaments = this.listFilter ? this.performFilter(this.listFilter) : this.departaments;
  }
  filteredDepartaments: Department[] = [];
  departaments: Department[] = [];

  performFilter(filterBy: string): Department[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.departaments.filter((department: Department) =>
      department.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  delete(id: String): void {
    this.departmentsService.delete(id).subscribe(_ => {});
  }

  edit(id: String): void {
    var department = <Department>{
      id: Number(id),
      description: this.description,
      name: this.name
    };

    this.departmentsService.update(department).subscribe(_ => {});
  }

  save(): void {
    var department = <Department>{
      id: Number(this.id),
      description: this.description,
      name: this.name
    };

    this.departmentsService.save(department).subscribe(_ => {});
  }

  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe(departments => {
      this.filteredDepartaments = departments;
      this.departaments = departments;
    });
  }

}

