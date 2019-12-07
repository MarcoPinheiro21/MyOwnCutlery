import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-client-right-forgotten-dialog',
  templateUrl: './client-right-forgotten-dialog.component.html',
  styleUrls: ['./client-right-forgotten-dialog.component.css']
})
export class ClientRightForgottenDialogComponent implements OnInit {

  client: Client;
  hasOrder: boolean;

  constructor(
    private dialogRef: MatDialogRef<ClientRightForgottenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data)  {
      this.client = data.client;
      this.hasOrder = data.hasOrder;
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
