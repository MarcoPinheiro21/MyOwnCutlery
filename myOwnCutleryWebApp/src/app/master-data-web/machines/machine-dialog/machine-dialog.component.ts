import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Machine } from 'src/app/models/machine.model';

@Component({
  selector: 'app-machine-dialog',
  templateUrl: './machine-dialog.component.html',
  styleUrls: ['./machine-dialog.component.css']
})
export class MachineDialogComponent implements OnInit {

  machine: Machine;
  isEdition: boolean;
  myForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MachineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.machine = data.machine;
      this.isEdition = data.isEdition;
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      minLength: new FormControl('minLength', Validators.minLength(5))
    });
  }

  close() {
    this.dialogRef.close();
  }

}
