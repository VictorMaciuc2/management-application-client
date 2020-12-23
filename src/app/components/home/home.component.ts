import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public technologies: Technology[];
  constructor(private employeeService: EmployeesService) {
    
   }

  ngOnInit(): void {
    this.employeeService.getEmployeesByRecommandation().subscribe(result => {
      this.technologies = result;
    })
  }

}
