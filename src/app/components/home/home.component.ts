import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology';
import { EmployeesService } from 'src/app/services/employees.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public technologies: Technology[];
  public dataRowsUserGrowth: any[];
  
  constructor(private employeeService: EmployeesService,
              private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.employeeService.getEmployeesByRecommandation().subscribe(result => {
      this.technologies = result;
    })
    
    this.feedbackService.getUserGrowth().subscribe(
      dataRow => {
        this.dataRowsUserGrowth = dataRow.filter(dataRow => dataRow.user.role === 3);
      }
    );
  }
}
