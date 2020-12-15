import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';

@Component({
    styleUrls: ['./date-modal.css'],
    templateUrl: './date-modal.html'
})

export class DateModal implements OnInit {
    project: Project;
    showStart: Boolean;
    showEnd: Boolean;
    constructor(public dialogRef: MatDialogRef<DateModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        this.project = this.data.project;
        this.showStart = this.data.showStart;
        this.showEnd = this.data.showEnd;
    }
}