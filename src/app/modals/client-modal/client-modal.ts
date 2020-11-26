import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/models/department';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Client } from 'src/app/models/client';

@Component({
    styleUrls: ['./client-modal.css'],
    templateUrl: './client-modal.html'
})

export class ClientModal implements OnInit {
    public client: Client;

    constructor(public dialogRef: MatDialogRef<ClientModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    ngOnInit() {
        this.client = this.data.client;
    }

    closeDialog() {
        this.dialogRef.close();
    }
}