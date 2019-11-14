import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateMachine } from '../machines.component';
import { MachineType } from 'src/app/models/machineType.model';

@Component({
  selector: 'app-machine-creation-dialog',
  templateUrl: './machine-creation-dialog.component.html',
  styleUrls: ['./machine-creation-dialog.component.css']
})
export class MachineCreationDialogComponent implements OnInit {

  machine: CreateMachine;
  machineTypes: MachineType[];

  constructor(
    private dialogRef: MatDialogRef<MachineCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.machineTypes = data.machineTypes;
    this.machine = data.machine;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.machine });
  }

}
