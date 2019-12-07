import { Component, OnInit, Inject } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-cancelation-dialog',
  templateUrl: './order-cancelation-dialog.component.html',
  styleUrls: ['./order-cancelation-dialog.component.css']
})
export class OrderCancelationDialogComponent implements OnInit {

    order: Order;
  constructor(
    private dialogRef: MatDialogRef<OrderCancelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.order = data.order;
    }


  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ order: this.order});
  }

}
