import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../models/project';

@Component({
    styleUrls: ['./project-modal.css'],
    templateUrl: './project-modal.html'
})
export class ProjectModal implements OnInit {
    public technologies = [];
    public employees = [];
    public employeesWithRecommandation = [];
    public clients = [];
    public project: Project;
    public isTechnologyInputVisible: boolean = false;
    public technologyName: string = '';
    public techAndEmployeesGroup;

    constructor(public dialogRef: MatDialogRef<ProjectModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    ngOnInit() {
        this.project = this.data.project;
        this.technologies = this.data.technologies;
        this.employees = this.data.employees;
        this.employeesWithRecommandation = this.data.employeesWithRecommandation;
        this.clients = this.data.clients;
        this.setTechnologiesAndClient();
        this.setTechGroup();
    }

    setTechnologiesAndClient() {
        this.project.technologies = this.technologies.filter(t => this.project.technologies.some(tech => tech.id == t.id));
        this.project.client = this.clients.find(c => c.id == this.project.clientId);
    }

    setTechGroup() {
        var employeesList = [];
        this.techAndEmployeesGroup = this.project.technologies.map(tech => {
            (<any>tech).users = [];
            return tech;
        });

        this.techAndEmployeesGroup.push({id: 0, name: 'Others', users: []});

        //delete duplicate and keep maximum experience
        this.employees.forEach(employee => {
            var employeeWithMaximumDays;
            var technology;
            this.employeesWithRecommandation.forEach(tech => {
                var user = tech.users.find(user => user.id == employee.id);
                if(!employeeWithMaximumDays || user.experienceInDays > employeeWithMaximumDays.experienceInDays)
                {
                    employeeWithMaximumDays = user;
                    technology = tech;
                }
            })
            
            var indexOfTechnology = employeeWithMaximumDays.experienceInDays != 0 ? this.techAndEmployeesGroup.findIndex(tech => tech.id == technology.id): this.techAndEmployeesGroup.length - 1;
            if(indexOfTechnology < 0)
                indexOfTechnology = this.techAndEmployeesGroup.length - 1;
            
            if(this.project.employees.some(e => e.id == employeeWithMaximumDays.id ))
                employeesList.push(employeeWithMaximumDays);

            this.techAndEmployeesGroup[indexOfTechnology].users.push(employeeWithMaximumDays);
        })

        // delete group with no recommandation
        this.techAndEmployeesGroup = this.techAndEmployeesGroup.filter(tech => tech.users.length != 0);

        // sort group by experience 
        this.techAndEmployeesGroup.forEach(tech => {
            tech.users.sort((a, b) => b.experienceInDays - a.experienceInDays);
        });

        this.project.employees = employeesList;
    }

    onKeyUp(event) {
        if (event.key == 'Backspace')
            this.technologyName = this.technologyName.slice(0, -1);
        else if (event.key.length == 1)
            this.technologyName += event.key;
    }

    showAddTechnology() {
        if (this.isTechnologyInputVisible && this.technologyName.length != 0) {
            this.technologies.push({ id: null, name: this.technologyName })
            this.technologyName = '';
        }
        this.isTechnologyInputVisible = !this.isTechnologyInputVisible;
    }
}
