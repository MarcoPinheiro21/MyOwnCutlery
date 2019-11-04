import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Machine } from 'src/app/models/machine.model';

@Component({
  selector: 'app-machine-dialog',
  templateUrl: './machine-dialog.component.html',
  styleUrls: ['./machine-dialog.component.css']
})
export class MachineDialogComponent implements OnInit {

  machine: Machine;

  constructor(
    private fb: FormBuilder,

    private dialogRef: MatDialogRef<MachineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.machine = data;
  }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  save() {

  }

}
