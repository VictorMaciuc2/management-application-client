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

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  user: User;
  sessions: ReportSession[];
  selectedSession: ReportSession;
  teammates: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'email', 'role', 'seniorityLevel', 'department', 'edit'];
  role = Role;
  seniorityLevel = SeniorityLevel;
  submitValue: User;
  reports: Report[][];

  constructor(private storageService: StorageService,
              private feedbackService: FeedbackService,
              private projectService: ProjectsService,
              public dialog: MatDialog) {
               }

  ngOnInit(): void {
    this.user = this.storageService.getLoggedInUser();
    this.getReportSessions();
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
}
