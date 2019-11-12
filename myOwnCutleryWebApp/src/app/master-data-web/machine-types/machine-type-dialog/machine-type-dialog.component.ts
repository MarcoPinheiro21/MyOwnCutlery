import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Operation } from 'src/app/models/operation.model';

@Component({
  selector: 'app-machine-type-dialog',
  templateUrl: './machine-type-dialog.component.html',
  styleUrls: ['./machine-type-dialog.component.css']
})
export class MachineTypeDialogComponent implements OnInit {

  operation: Operation;
  isEdition: boolean;
  myForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MachineTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.operation = data.operation;
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