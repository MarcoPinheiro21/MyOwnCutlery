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
      e["machineType"] = this.selectedMachineType.desc;
      e["operationId"] = op.operationId;
      e["toolId"] = op.toolId;
      e["tool"] = op.tool;
      e["operationType"] = op.operationType;
      e["operationTypeId"] = op.operationTypeId;
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

  private addOperationToMachineType(element: Element) {
    let op = <Operation>{};
    op.operationId = element.operationId;
    op.operationType = element.operationType;
    op.operationTypeId = element.operationTypeId;
    op.tool = element.tool;
    op.toolId = element.toolId;
    this.selectedMachineType.operationList.push(op);
  }

  private removeOperationFromMachineType(element: Element) {
    this.selectedMachineType.operationList =
      this.selectedMachineType.operationList.filter(op =>
        op.operationId != element.operationId);

  }

  onCheckClick(element: Element) {
    if (!element.checked) {
      this.addOperationToMachineType(element);
    } else {
      this.removeOperationFromMachineType(element);
    }
  }

  save(){
    this.dialogRef.close({ data: this.selectedMachineType });
  }

  close() {
    this.dialogRef.close();
  }
}

export interface Element {
  checked: boolean;
  machineType:string;
  operationId: number;
  toolId: number;
  tool: string;
  operationTypeId: number;
  operationType: string;
  highlighted?: boolean;
  hovered?: boolean;
}