import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-client-creation-dialog',
  templateUrl: './client-creation-dialog.component.html',
  styleUrls: ['./client-creation-dialog.component.css']
})
export class ClientCreationDialogComponent implements OnInit {
  
  client : Client;
  
  constructor(
    private dialogRef: MatDialogRef<ClientCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.client = data.client;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.client });
  }

}
