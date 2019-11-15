import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateProduct, CreateOperation } from '../product.component';
import { Operation } from 'src/app/models/operation.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  product: CreateProduct;
  operations: Operation[];
  elements: Element[] = [];
  displayedColumns: string[] = [
    'checked',
    'operationId',
    'tool',
    'operationType'];

  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.product = data.product;
    this.operations = data.operations;
  }

  ngOnInit() {
    this.fillElements();
  }

  private fillElements() {
    this.operations.forEach(op => {
      let e = <Element>{};
      e["checked"] = this.productIncludesOp(op);
      e["operationId"] = op.operationId;
      e["tool"] = op.tool;
      e["operationType"] = op.operationType.desc;
      e["highlighted"] = false;
      e["hovered"] = false;
      this.elements.push(e);
    });
  }

  private productIncludesOp(operation: Operation): boolean {
    var bol = false;
    this.product.plan.operations.forEach(op => {
      if (op.operationId == operation.operationId) {
        bol = true;
      }
    });
    return bol;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.product });
  }

  private addOperationToMachineType(element: Element) {
    let op = <CreateOperation>{};
    op.operationId = element.operationId;
    this.product.plan.operations.push(op);
  }

  private removeOperationFromMachineType(element: Element) {
    this.product.plan.operations =
      this.product.plan.operations.filter(op =>
        op.operationId != element.operationId);

  }

  onCheckClick(element: Element) {
    if (!element.checked) {
      this.addOperationToMachineType(element);
    } else {
      this.removeOperationFromMachineType(element);
    }
  }
}
export interface Element {
  checked: boolean;
  operationId: number;
  tool: string;
  operationType: string;
  highlighted?: boolean;
  hovered?: boolean;
}