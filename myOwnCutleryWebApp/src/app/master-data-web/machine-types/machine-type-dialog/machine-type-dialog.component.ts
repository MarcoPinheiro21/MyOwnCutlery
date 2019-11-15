import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { Operation } from 'src/app/models/operation.model';
import { MachineType } from 'src/app/models/machineType.model';
import { OperationType } from 'src/app/models/operationType.model';

@Component({
  selector: 'app-machine-type-dialog',
  templateUrl: './machine-type-dialog.component.html',
  styleUrls: ['./machine-type-dialog.component.css']
})

export class MachineTypeDialogComponent implements OnInit {


  operations: Operation[];
  selectedMachineType: MachineType;
  isSelectedOperationsEmpty: boolean;
  elements: Element[] = [];
  isEdition: boolean;
  
  displayedColumns: string[] = [
    'checked',
    'operationId',
    'tool',
    'operationType'];

  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  constructor(
    private dialogRef: MatDialogRef<MachineTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.operations = data.listOperations;
    this.selectedMachineType = data.machinetype;
    this.isEdition = data.isEdition;
  }

  ngOnInit() {
    this.fillElements();
    if (this.selectedMachineType == null) {
      this.selectedMachineType = <MachineType>{
        operationList: []
      };
    }

  }

  private fillElements() {
    this.operations.forEach(op => {
      let e = <Element>{};
      e["checked"] = this.selectedMachineIncludesOp(op);
      e["machineType"] = this.selectedMachineType != null ? this.selectedMachineType.desc : null;
      e["operationId"] = op.operationId;
      e["toolId"] = op.toolId;
      e["tool"] = op.tool;
      e["operationType"] = op.operationType.desc;
      e["operationTypeId"] = op.operationType.operationTypeId;
      e["highlighted"] = false;
      e["hovered"] = false;
      this.elements.push(e);
    });
  }

  private selectedMachineIncludesOp(operation: Operation): boolean {
    var bol = false;
    if (this.selectedMachineType != null) {
      this.selectedMachineType.operationList.forEach(op => {
        if (op.operationId == operation.operationId) {
          bol = true;
        }
      });
    }
    return bol;
  }

  private addOperationToMachineType(element: Element) {
    let op = <Operation>{
      operationType:<OperationType>{}
    };
    op.operationId = element.operationId;
    op.operationType.desc = element.operationType;
    op.operationType.operationTypeId = element.operationTypeId;
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

  checkEmptyOperationsList() {
    this.isSelectedOperationsEmpty =
      this.selectedMachineType.operationList.length == 0;
  }

  save(isEdition: boolean) {
    if (!isEdition) {
      this.checkEmptyOperationsList();
      if (this.inputFormControl.hasError('required') ||
        this.inputFormControl.hasError('minlength') ||
        this.isSelectedOperationsEmpty) {
        return;
      }

      this.selectedMachineType.desc = this.inputFormControl.value;
    }
    this.dialogRef.close({ data: this.selectedMachineType });
    return;
  }

  close() {
    this.dialogRef.close();
  }
}

export interface Element {
  checked: boolean;
  machineType: string;
  operationId: number;
  toolId: number;
  tool: string;
  operationTypeId: number;
  operationType: string;
  highlighted?: boolean;
  hovered?: boolean;
}