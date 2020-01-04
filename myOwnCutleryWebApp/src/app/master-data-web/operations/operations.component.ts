import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { OperationsService } from "./operations.service";
import { Operation } from "src/app/models/operation.model";
import { OperationDialogComponent } from "./operation-dialog/operation-dialog.component";
import { Tool } from "src/app/models/tool.model";
import { OperationType } from "src/app/models/operationType.model";

@Component({
  selector: "app-operations",
  templateUrl: "./operations.component.html",
  styleUrls: ["./operations.component.css"]
})
export class OperationsComponent implements OnInit, AfterViewInit {
  operations: Operation[] = [];
  operationService: OperationsService;
  dialog: MatDialog;
  tools: Tool[] = [];
  operationTypes: OperationType[] = [];

  constructor(
    _operationService: OperationsService,
    private _dialog: MatDialog
  ) {
    this.operationService = _operationService;
    this.dialog = _dialog;
  }

  ngOnInit() {
    this.getOperations();
  }

  ngAfterViewInit() {
    this.getTools();
    this.getOperationTypes();
  }

  public openCreationDialog() {
    const dialogConfig = new MatDialogConfig();
    const operation: CreateOperation = {
      ToolId: 0,
      OperationType: ''
    };

    dialogConfig.data = {
      operation,
      tools: this.tools,
      operationTypes: this.operationTypes
    };
    dialogConfig.width = "425px";
    dialogConfig.height = "225px";

    this.dialog
      .open(OperationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (!!result) {
          return this.createOperation(result.data);
        }
      });
  }

  getOperations(): void {
    this.operationService.getOperations().subscribe((data: any) => {
      this.operations = data;
    });
  }

  getTools(): void {
    this.operationService.getTools().subscribe((data: any) => {
      this.tools = data;
    });
  }

  getOperationTypes(): void {
    this.operationService.getOperationTypes().subscribe((data: any) => {
      this.operationTypes = data;
    });
  }

  createOperation(operation) {
    this.operationService.createOperation(operation).subscribe(() => {
      this.getOperations();
    });
  }
}

export interface CreateOperation {
  ToolId: number;
  OperationType: string;
}
