import { Component, OnInit } from "@angular/core";
import { AlertMessage } from "src/app/master-data-web/machine-types/machine-types.component";

import { Order } from "src/app/models/order.models";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { OrderEditionDialogComponent } from "./order-edition-dialog/order-edition-dialog.component";
import { Product } from "src/app/models/product.model";
import { Client } from 'src/app/models/client.model';
import { OrderService } from '../order.service';
import { ProductsService } from 'src/app/master-data-web/product/product.service';
import { OrderLine } from 'src/app/models/order-line.model';
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  orderLines: OrderLine[];
  ordersService: OrderService;
  productsService: ProductsService;
  product: Product[];
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};
  constructor(_ordersService: OrderService, private myDialog: MatDialog) {
    this.ordersService = _ordersService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
  }
  ngOnInit() {
    this.getOrders();
  }
  private getOrders(): void {
    this.ordersService.getOrdersAndOrderLines().subscribe((data: any) => {
      this.orders = data.orders;
      this.orderLines = data.orderLines;
    });
  }


  createOrder(order) {
    this.ordersService.createOrder(order).subscribe(() => {
      this.getOrders();
    });
  }


  openEditionDialog(selectedProduct?, selectedOrder?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      order: selectedOrder,
      product: selectedProduct
    };
    dialogConfig.width = "425px";
    dialogConfig.height = "550px";
    this.dialog
      .open(OrderEditionDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (!!result) {
          return this.updateOrder(result.data);
        }
      });
  }
  updateOrder(order) {
    this.ordersService.updateOrder(order).subscribe(() => {
      this.getOrders();
    });
  }

  getProductById(productId) {

    this.ordersService.getProductById(productId).subscribe((data: any) => {
      this.product = data;

    });
  }

  saveOrderLine(){

  }

}
export interface CreateOrder {
  customerId: string;
  products: Product[];
  deliveryDate: number;
}