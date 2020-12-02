import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Project } from '../../models/project';

@Component({
    styleUrls: ['./project-modal.css'],
    templateUrl: './project-modal.html'
})

export class ProjectModal implements OnInit {
    public technologies = [];
    public employees = [];
    public clients = [];
    public dropdownSettings: IDropdownSettings;
    public clientDropdownSettings: IDropdownSettings;
    public project: Project;
    public isTechnologyInputVisible: boolean = false;
    public technologyName: string = '';
    public contorId: number = 0;

    constructor(public dialogRef: MatDialogRef<ProjectModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dropdownSettings = <IDropdownSettings>{
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            itemsShowLimit: 3,
            allowSearchFilter: false,
            showSelectedItemsAtTop: true,
            enableCheckAll: true
        };

        this.clientDropdownSettings = {...this.dropdownSettings};
        this.clientDropdownSettings.singleSelection = true;
    }


    ngOnInit() {
        this.project = this.data.project;
        this.technologies = this.data.technologies;
        this.employees = this.data.employees;
        this.clients = this.data.clients;
    }

    onKeyUp(event) {
        if (event.key == 'Backspace')
            this.technologyName = this.technologyName.slice(0, -1);
        else if (event.key.length == 1)
            this.technologyName += event.key;
    }

    showAddTechnology() {
        if (this.isTechnologyInputVisible && this.technologyName.length != 0) {
            // add ids just for UI
            this.technologies.push({ id: this.contorId--, name: this.technologyName })
            this.technologyName = '';
        }
        this.isTechnologyInputVisible = !this.isTechnologyInputVisible;
    }
}
