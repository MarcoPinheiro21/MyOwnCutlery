import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderLine } from 'src/app/models/order-line.model';
import { Product } from 'src/app/models/product.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-edition-dialog',
  templateUrl: './order-edition-dialog.component.html',
  styleUrls: ['./order-edition-dialog.component.css']
})
export class OrderEditionDialogComponent implements OnInit {
  currentDate: string;
  deliveryDate: string;
  client: string;
  isSelectedProductsEmpty: boolean;
  order: Order;
  products: Product[];
  elements: Element[] = [];
  displayedColumns: string[] = [
    'checked',
    'productName',
    'quantity'];

  constructor(
    private dialogRef: MatDialogRef<OrderEditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.products = data.products;
    this.order = data.order;
    this.deliveryDate = this.order.deliveryDate.substring(0, 10);
  }

  ngOnInit() {
    this.fillElements();
    var today = new Date();
    this.currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  }

  private fillElements() {
    this.products.forEach(op => {
      let e = <Element>{};
      var contained = this.containsProduct(op.productId);
      e["checked"] = contained;
      e["productId"] = op.productId;
      e["productName"] = op.productName;
      if (contained) {
        e["quantity"] = this.getQuantity(op);
      } else {
        e["quantity"] = 0;
      }
      e["highlighted"] = false;
      e["hovered"] = false;
      this.elements.push(e);
    });
  }

  containsProduct(p) {
    var boo = false;
    this.order.products.forEach(op => {
      if (op.id == p.toString()) {
        boo = true;
      }
    });
    return boo;
  }

  getQuantity(p: Product) {
    var q = 0;
    this.order.products.forEach(op => {
      if (op.id == p.productId.toString()) {
        q = op.quantity;
      }
    });
    return q;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.checkEmptyProductsList();
    if (this.isSelectedProductsEmpty) {
      return;
    }
    this.elements.forEach(op => {
      var bool = this.containsProduct(op.productId);
      if (op.checked) {
        if(bool){
          this.changeQuantity(op);
        }else{
          let e = <OrderLine>{};
          e["id"] = op.productId.toString();
          e["quantity"] = op.quantity;
          this.order.products.push(e);
        }
      }else{
        if(bool){
          this.deleteOrderLine(op.productId);
        }
      }
    });
    this.order.deliveryDate = this.deliveryDate.toString() + "T00:00:00";
    this.dialogRef.close({ data: this.order });
    return;
  }

  deleteOrderLine(p) {
    this.order.products.forEach(op => {
      if (op.id == p.toString()) {
        op.toDelete="true";
      }
    });
  }

  changeQuantity(p) {
    this.order.products.forEach(op => {
      if (op.id == p.productId.toString()) {
        op.quantity=p.quantity;
      }
    });
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