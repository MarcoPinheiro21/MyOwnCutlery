import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MachineTypeDialogComponent } from '../machine-type-dialog/machine-type-dialog.component';
import { Machine } from 'src/app/models/machine.model';

@Component({
  selector: 'app-machines-by-type-dialog',
  templateUrl: './machines-by-type-dialog.component.html',
  styleUrls: ['./machines-by-type-dialog.component.css']
})
export class MachinesByTypeDialogComponent implements OnInit {

  machines: Machine[];

  constructor(
    private dialogRef: MatDialogRef<MachineTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.machines=data.machinesList;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
