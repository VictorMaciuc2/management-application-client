import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/models/department';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    styleUrls: ['./department-modal.css'],
    templateUrl: './department-modal.html'
})

export class DepartmentModal implements OnInit {
    public department: Department;

    constructor(public dialogRef: MatDialogRef<DepartmentModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    ngOnInit() {
        this.department = this.data.department;
    }

    closeDialog() {
        this.dialogRef.close();
    }
}