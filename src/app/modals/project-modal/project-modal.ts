import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Project} from '../../models/project';

@Component({
    styleUrls: ['./project-modal.css'],
    templateUrl: './project-modal.html'
})

export class ProjectModal implements OnInit {
    public project: Project;

    constructor(public dialogRef: MatDialogRef<ProjectModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    ngOnInit() {
        this.project = this.data.project;
    }
}
