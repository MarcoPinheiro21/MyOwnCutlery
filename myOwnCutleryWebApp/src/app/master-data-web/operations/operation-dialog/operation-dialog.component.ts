import { Component, OnInit, Inject } from "@angular/core";
import { Operation } from "src/app/models/operation.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OperationType } from "src/app/models/operationType.model";
import { Tool } from "src/app/models/tool.model";

@Component({
  selector: "app-operation-dialog",
  templateUrl: "./operation-dialog.component.html",
  styleUrls: ["./operation-dialog.component.css"]
})
export class OperationDialogComponent implements OnInit {
  operation: Operation;
  operationTypes: OperationType[];
  tools: Tool[];

  constructor(
    private dialogRef: MatDialogRef<OperationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.operation = data.operation;
    this.operationTypes = data.operationTypes;
    this.tools = data.tools;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.operation });
  }
}
