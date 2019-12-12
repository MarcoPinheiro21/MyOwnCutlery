import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderLine } from 'src/app/models/order-line.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-order-creation-dialog',
  templateUrl: './order-creation-dialog.component.html',
  styleUrls: ['./order-creation-dialog.component.css']
})
export class OrderCreationDialogComponent implements OnInit {
  currentDate: string;
  deliveryDate: Date;
  client: string;
  isSelectedProductsEmpty: boolean;
  order: CreateOrder;
  products: Product[];
  elements: Element[] = [];
  displayedColumns: string[] = [
    'checked',
    'productName',
    'quantity'];

  constructor(
    private dialogRef: MatDialogRef<OrderCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.products = data.products;
    this.client = data.client;
    this.order = { customerId: "", deliveryDate: null, products: [] };
  }

  ngOnInit() {
    this.fillElements();
    var today = new Date();
    this.currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  }

  private fillElements() {
    this.products.forEach(op => {
      let e = <Element>{};
      e["checked"] = false;
      e["productId"] = op.productId;
      e["productName"] = op.productName;
      e["quantity"] = 0;
      e["highlighted"] = false;
      e["hovered"] = false;
      this.elements.push(e);
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.checkEmptyProductsList();
    if (this.isSelectedProductsEmpty) {
      return;
    }
    this.order.customerId = this.client;
    this.elements.forEach(op => {
      if (op.checked && op.quantity > 0) {
        let e = <OrderLine>{};
        e["id"] = op.productId.toString();
        e["quantity"] = op.quantity;
        this.order.products.push(e);
      }
    });
    this.order.deliveryDate = this.deliveryDate.toString() + "T00:00:00";
    this.dialogRef.close({ data: this.order });
    return;
  }

  checkEmptyProductsList() {
    var count = 0;
    this.elements.forEach(op => {
      if (op["checked"] && op["quantity"] > 0) {
        count++;
      }
    });
    this.isSelectedProductsEmpty =
      count == 0;
  }

  private addProductToOrder(element: Element) {
    let op = <OrderLine>{};
    op.id = element.productId.toString();
    this.order.products.push(op);
  }

  private removeProductFromOrder(element: Element) {
    this.order.products =
      this.order.products.filter(op =>
        op.id != element.productId.toString());

  }

  onCheckClick(element: Element) {
    if (!element.checked) {
      this.addProductToOrder(element);
    } else {
      this.removeProductFromOrder(element);
    }
  }

  updateQuantity(element: Element) {
    if (element.quantity == 0 && !element.checked) {
      element.quantity = 1;
    }
    else if (element.quantity != 0 && element.checked) {
      element.quantity = 0;
    }
  }

}
export interface Element {
  checked: boolean;
  productId: number;
  productName: string;
  quantity: number;
  highlighted?: boolean;
  hovered?: boolean;
}

export class CreateOrder {
  customerId: string;
  products: OrderLine[];
  deliveryDate: string
}