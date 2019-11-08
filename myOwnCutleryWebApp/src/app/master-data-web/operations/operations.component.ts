import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OperationsService } from './operations.service';
import { Operation } from 'src/app/models/operation.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: Operation [] = [];
  operationService: OperationsService;
  dialog: MatDialog;

  constructor(_operationService: OperationsService, private _dialog: MatDialog) {
    this.operationService = _operationService;
    this.dialog = _dialog;
   }

  ngOnInit() {
    this.getOperations();
  }

  share() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.operations[0];

  //  this.dialog.open(OperationDialogComponent, dialogConfig);
}

  public getOperations(): void {
    this.operationService.getOperations().subscribe((data: any) => {
      this.operations = data;
    });
  }
}
