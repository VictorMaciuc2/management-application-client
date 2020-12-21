import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/models/department';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/enums/Role';
import { SeniorityLevel } from 'src/app/enums/SeniorityLevel';
import { Skill } from 'src/app/models/skill';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Report } from 'src/app/models/report';

@Component({
    styleUrls: ['./feedback-modal.css'],
    templateUrl: './feedback-modal.html'
})

export class FeedbackModal implements OnInit {
    @Input() reports: Report[];
    @Output() reportsChanged = new EventEmitter<Report[]>();
    skills: Skill[];

    constructor(public dialogRef: MatDialogRef<FeedbackModal>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private feedbackService: FeedbackService) {
    }


    ngOnInit() {
        this.feedbackService.getSkills().subscribe(
            skills => {
                this.skills = skills
                this.reports = this.data.reports;

                if (this.reports === undefined){
                    this.createEmptyReports();
                }
            }
        );
    }

    createEmptyReports(){
        this.reports = <Report[]> [];
        this.skills.forEach(skill => {
            var newReport = new Report();
            newReport.skill = skill;
            newReport.user = this.data.employee;
            this.reports.push(newReport);
        });
    }
}