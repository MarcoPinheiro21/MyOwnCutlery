import { Component, OnInit, Inject } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-client-edition-dialog',
  templateUrl: './client-edition-dialog.component.html',
  styleUrls: ['./client-edition-dialog.component.css']
})
export class ClientEditionDialogComponent implements OnInit {

  client : Client;
  
  constructor(
    private dialogRef: MatDialogRef<ClientEditionDialogComponent>,
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


