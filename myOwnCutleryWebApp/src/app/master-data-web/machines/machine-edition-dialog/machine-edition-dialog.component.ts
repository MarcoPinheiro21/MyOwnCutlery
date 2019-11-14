import { Component, OnInit, Inject } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachineType } from 'src/app/models/machineType.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-machine-edition-dialog',
  templateUrl: './machine-edition-dialog.component.html',
  styleUrls: ['./machine-edition-dialog.component.css']
})
export class MachineEditionDialogComponent implements OnInit {

  machine: Machine;
  machineTypes: MachineType[];

  constructor(
    private dialogRef: MatDialogRef<MachineEditionDialogComponent>,
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
