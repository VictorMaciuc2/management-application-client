import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/enums/Role';
import { SeniorityLevel } from 'src/app/enums/SeniorityLevel';
import { FeedbackModal } from 'src/app/modals/feedback-modal/feedback-modal';
import { Report } from 'src/app/models/report';
import { ReportSession } from 'src/app/models/reportSession';
import { User } from 'src/app/models/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { StorageService } from 'src/app/services/local-storage.service';
import { ProjectsService } from 'src/app/services/projects.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { series } from "./data";
import { EmployeesService } from 'src/app/services/employees.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  user: User;
  sessions: ReportSession[];
  selectedSession: ReportSession;
  selectedDataRow: any;
  teammates: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'email', 'role', 'seniorityLevel', 'department', 'edit'];
  role = Role;
  seniorityLevel = SeniorityLevel;
  submitValue: User;
  reports: Report[][];
  dataRows: any[];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private storageService: StorageService,
              private feedbackService: FeedbackService,
              private projectService: ProjectsService,
              public dialog: MatDialog) {
               }

  ngOnInit(): void {
    this.user = this.storageService.getLoggedInUser();
    this.getReportSessions();
    this.getUserGrowth();
  }

  getUserGrowth(){
    this.feedbackService.getUserGrowth().subscribe(
      dataRow => {
        this.dataRows = dataRow.filter(dataRow => dataRow.user.role === 3);

        this.selectedDataRow = this.dataRows[0];
        this.createChart();
      }
    );
  }

  getTeammates(){
    this.projectService.getUsersByProject(this.selectedSession.project.id).subscribe(
      users => {
        this.teammates = users.filter(user => user.id !== this.user.id);
        this.dataSource = new MatTableDataSource(this.teammates);
        this.reports = <Report[][]> [];
      }
    );
  }

  getReportSessions(){
    this.feedbackService.getReportSessionsForUser(this.user).subscribe(
      sessions => {
        this.sessions = sessions.filter(session => !session.was_completed);
        if (this.sessions.length > 0){
          this.selectedSession = this.sessions[0];
          this.getTeammates();
        }
      }
    );
  }

  editEmployee(employee: User){
    let dialogRef = this.dialog.open(FeedbackModal, {
      data: {
        employee: employee,
        reports: this.reports[employee.id]
      }
    });

    dialogRef.afterClosed().subscribe(
      reports => {
        this.reports[employee.id] = reports;
      }
    )
  }

  onSubmit(){
    if (this.teammates.length !== this.reports.filter(report => report !== undefined).length ||
        this.reports.some(reportArray => reportArray.some(reportArray => reportArray.mark === undefined))){
      alert ('Please complete all your feedback requests');
      return;
    }

    this.feedbackService.submitReportSession(this.selectedSession, this.reports).subscribe(
      forget => location.reload()
    );
  }

  createChart(){
    if (this.selectedDataRow === undefined){
      return;
    }

    this.chartOptions = {
      series: [
        {
          name: "Feedback",
          data: this.selectedDataRow.reports.map(report => report.rating)
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Skills growth",
        align: "left"
      },
      subtitle: {
        text: this.selectedDataRow.user.name,
        align: "left"
      },
      labels: this.selectedDataRow.reports.map(report => report.date),
      xaxis: {
        type: "datetime",
        labels: {
          format: 'dd MMM'
        }
      },
      yaxis: {
        max: 5,
        min: 1,
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }
}
