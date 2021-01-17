import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology';
import { EmployeesService } from 'src/app/services/employees.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ProjectsService } from 'src/app/services/projects.service';
import {Skill} from "../../models/skill";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public technologies: Technology[];
  public dataRowsUserGrowth: any[];
  public progressOfProjects: any[];
  public skillRatings: any[];
  public usersWithProjects: any[];
  public mostUsedTech: any[];
  constructor(private employeeService: EmployeesService,
              private feedbackService: FeedbackService,
              private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.employeeService.getEmployeesByRecommandation().subscribe(result => {
      this.technologies = result;
    })

    this.feedbackService.getUserGrowth().subscribe(
      dataRow => {
        this.dataRowsUserGrowth = dataRow.filter(dataRow => dataRow.user.role === 3);
      }
    );

    this.projectsService.getProgressOfProjects().subscribe(progressOfProjects => {
      this.progressOfProjects = progressOfProjects.sort((a,b) => { return b.procent - a.procent });
    });
    this.feedbackService.getUsersOnSkillRating().subscribe(result =>{
      this.skillRatings = result;
    });

    this.projectsService.getUsersWithAssignedProjects().subscribe(result => {
      this.usersWithProjects = result.sort((a,b) => { return b.count - a.count });
    })

    this.projectsService.getMostUsedTech().subscribe(result => {
      this.mostUsedTech = Object.values(result);
    })
  }
}
