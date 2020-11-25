import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    styleUrls: ['./delete-confirmation.css'],
    templateUrl: './delete-confirmation.html'
})

export class DeleteConfirmationModal implements OnInit {
    constructor(public dialogRef: MatDialogRef<DeleteConfirmationModal>) {}


    ngOnInit(): void {
        
    }

    closeDialog() {
        this.dialogRef.close();
    }
}