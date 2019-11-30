import { Component, OnInit } from "@angular/core";
import { AlertMessage } from "src/app/master-data-web/machine-types/machine-types.component";
import { Order } from "src/app/models/order.model";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { OrderEditionDialogComponent } from "./order-edition-dialog/order-edition-dialog.component";
import { Product } from "src/app/models/product.model";
import { OrderService } from "./order.service";
import { ProductsService } from "src/app/master-data-web/product/product.service";
import { OrderLine } from "src/app/models/order-line.model";
import { Client } from 'src/app/models/client.model';
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  ordersService: OrderService;
  productsService: ProductsService;
  product: Product[];
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};
  thisClient : Client;
  constructor(_ordersService: OrderService, private myDialog: MatDialog) {
    this.ordersService = _ordersService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
  }
  
  ngOnInit() {
    this.getOrders();
  }

  private getOrders(): void {
    let userId = localStorage.getItem("user_id");
    this.ordersService.getOrders().subscribe((ordersData: any) => {
      ordersData.forEach(oElement => 
        oElement.products.forEach(pElement => 
          this.ordersService.getProductById(pElement.id).subscribe((productData) => {
            pElement.productName=productData.productName;
          })      
        )     
      );
      this.ordersService.getClients().subscribe((data: any) => {
        this.thisClient=data.filter(client => client.userId === userId);
        this.orders = ordersData.filter(order => order.customerId === this.thisClient[0]._id);
      });    
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
}
export interface CreateOrder {
  customerId: string;
  products: Product[];
  deliveryDate: number;
}
