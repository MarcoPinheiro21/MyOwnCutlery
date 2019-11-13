import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { Operation } from 'src/app/models/operation.model';
import { OperationsService } from '../../operations/operations.service';
import { MachineType } from 'src/app/models/machineType.model';

@Component({
  selector: 'app-machine-type-dialog',
  templateUrl: './machine-type-dialog.component.html',
  styleUrls: ['./machine-type-dialog.component.css']
})

export class MachineTypeDialogComponent implements OnInit {

  ;
  // elements: Element[]=[{checked: true, operationId:1, tool:'toll', operationType:1}];
  operations: Operation[];
  selectedMachineType: MachineType;
  elements: Element[] = [];
  displayedColumns: string[] = [
    'checked',
    'operationId',
    'tool',
    'operationType'];

  constructor(
    private dialogRef: MatDialogRef<MachineTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.operations = data.listOperations;
    this.selectedMachineType = data.machinetype;
  }

  ngOnInit() {
    this.fillElements();
  }

  private fillElements() {
    this.operations.forEach(op => {
      let e = <Element>{};
      e["checked"] = this.selectedMachineIncludesOp(op);
      e["operationId"] = op.operationId;
      e["tool"] = op.tool;
      e["operationType"] = op.operationType;
      e["highlighted"] = false;
      e["hovered"] = false;
      this.elements.push(e);
    });
  }

  private selectedMachineIncludesOp(operation: Operation): boolean {
    var bol = false;
    this.selectedMachineType.operationList.forEach(op => {
      if (op.operationId == operation.operationId) {
        bol = true;
      }
    });
    return bol;
  }

  close() {
    this.dialogRef.close();
  }
}

export interface Element {
  checked: boolean;
  operationId: number;
  tool: string;
  operationType: string;
  highlighted?: boolean;
  hovered?: boolean;
}