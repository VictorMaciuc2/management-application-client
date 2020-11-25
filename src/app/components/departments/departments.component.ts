import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department';
import { DepartmentsService } from 'src/app/services/departments.service';
@Component({
  selector: 'app-departments',
  styleUrls: ['./departments.component.css'],
  providers: [DepartmentsService]
})
export class DepartmentsComponent implements OnInit {

  constructor(private departmentsService: DepartmentsService) { }
  _listFilter = '';
  id: String;
  name: String;
  description: String;
  displayedColumns: string[] = ['name','description'];
  settings = {
    columns: {
      id: {
        title: 'ID',
        hide: true
      },
      name: {
        title: 'Department name'
      },
      description: {
        title: 'Description'
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
     // this.departmentsService.update(event.newData.id,event.newData.name,event.newData.description)
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
     // this.departmentsService.save(event.newData.name,event.newData.description)
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.departmentsService.delete(event.data.id)
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepartaments = this.listFilter ? this.performFilter(this.listFilter) : this.departaments;}
    filteredDepartaments: Department[] = [];
    departaments: Department[] = [];
  
    dataSource=[{name: "nume", description: "description"}]

    
    performFilter(filterBy: string): Department[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.departaments.filter((department: Department) =>
      department.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    delete(id : String): void{
      //id trimis de pe componentul din tabel pe care s-a dat click
      this.departmentsService.delete(id);
    }
    edit(id: String): void{
      //id trimis de pe componentul din tabel pe care s-a dat click
      //this.departmentsService.update(id,this.name,this.description); 
    }
    save(): void{
     // this.departmentsService.save(this.id,this.name,this.description);
    }
    

    ngOnInit(): void {
      this.departmentsService.getDepartments().subscribe({
        next: departaments => {
          this.departaments = departaments;
        this.filteredDepartaments = this.departaments;
        }
      //  error: err => this.errorMessage = err
      });
    }
  }

  // delete(id: String): void {
  //   this.departmentsService.delete(id).subscribe(_ => {
  //     let indexOfDepartment = this.departaments.indexOf(this.departaments.find(d => d.id == Number(id)));
  //     this.departaments.splice(indexOfDepartment, 1);
  //   });
  // }

  // edit(id: String): void {
  //   var department = <Department>{
  //     id: Number(id),
  //     description: this.description,
  //     name: this.name
  //   };

  //   this.departmentsService.update(department).subscribe(updatedDepartment => {
  //     let indexOfDepartment = this.departaments.indexOf(this.departaments.find(d => d.id == Number(id)));
  //     this.departaments[indexOfDepartment] = updatedDepartment;
  //   });
  // }

