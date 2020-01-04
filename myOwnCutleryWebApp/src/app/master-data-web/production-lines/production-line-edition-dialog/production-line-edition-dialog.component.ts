import { Component, OnInit, Inject } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductionLine } from 'src/app/models/productionLine.model';

@Component({
  selector: 'app-production-line-edition-dialog',
  templateUrl: './production-line-edition-dialog.component.html',
  styleUrls: ['./production-line-edition-dialog.component.css']
})
export class ProductionLineEditionDialogComponent implements OnInit {
  isSelectedMachinesEmpty : boolean;
  productionline: ProductionLine[];
  machines: Machine[];
  
  constructor(private dialogRef: MatDialogRef<ProductionLineEditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.productionline = data.productionline;
      this.machines = data.machines;
     }

  
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.productionline });
  }

}
