import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/models/department';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/enums/Role';
import { SeniorityLevel } from 'src/app/enums/SeniorityLevel';

@Component({
    styleUrls: ['./employee-modal.css'],
    templateUrl: './employee-modal.html'
})

export class EmployeeModal implements OnInit {
    public employee: User;
    public rolesKeys = [];
    public roles = Role;
    public seniorityLevelsKeys = [];
    public seniorityLevels = SeniorityLevel;
    public departments: Department[];

    constructor(public dialogRef: MatDialogRef<EmployeeModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    ngOnInit() {
        this.employee = this.data.employee;
        this.departments = this.data.departments;
        this.rolesKeys = Object.keys(Role).slice(4);
        this.seniorityLevelsKeys = Object.keys(SeniorityLevel).slice(3);
    }
}