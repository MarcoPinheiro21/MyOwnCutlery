import { Component, OnInit } from "@angular/core";
import { AlertMessage } from "src/app/master-data-web/machine-types/machine-types.component";
import { Order } from "src/app/models/order.model";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { OrderEditionDialogComponent } from "./order-edition-dialog/order-edition-dialog.component";
import { Product } from "src/app/models/product.model";
import { OrderService } from "./order.service";
import { ProductsService } from "src/app/master-data-web/product/product.service";
import { Client } from "src/app/models/client.model";
import { OrderLine } from 'src/app/models/order-line.model';
import { OrderCreationDialogComponent } from './order-creation-dialog/order-creation-dialog.component';
import { stringify } from 'querystring';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  ordersService: OrderService;
  productsService: ProductsService;
  products: Product[]; //for creation
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};
  thisClient: Client;
  constructor(_ordersService: OrderService, private myDialog: MatDialog) {
    this.ordersService = _ordersService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
  }

  ngOnInit() {
    this.getOrders();
  }

  public getOrders(): void {
    let userId = localStorage.getItem("user_id");
    this.ordersService.getOrders().subscribe((ordersData: any) => {
      ordersData.forEach(oElement =>
        oElement.products.forEach(pElement =>
          this.ordersService
            .getProductById(pElement.id)
            .subscribe(productData => {
              pElement.productName = productData.productName;
            })
        )
      );
      this.ordersService.getClients().subscribe((data: any) => {
        this.thisClient = data.filter(client => client.userId === userId);
        this.orders = ordersData.filter(
          order => order.customerDetails.id === this.thisClient[0]._id
        );
      });
    });
  }

  openCreationDialog() {
    this.ordersService.getProducts().subscribe((data: any) => {
      this.products = data;

      const dialogConfig = new MatDialogConfig();


      const order = {
        clientId: String,
        products: OrderLine,
        deliveryDate: Date
      };

      dialogConfig.data = {
        products: this.products,
        client: this.thisClient[0]._id
      };
      dialogConfig.width = '600px';
      dialogConfig.height = '400px';

      this.dialog.open(OrderCreationDialogComponent, dialogConfig).afterClosed().subscribe(result => {
        if (result != undefined) {
          this.ordersService
            .createOrder(result.data)
            .subscribe(
              () => {
                var mt = result.data.productName;
                this.generateSuccessMsg(mt);
                this.alertMessage.success = true;
                this.getOrders();
                this.timerHideAlert();
              },
              (error: Error) => {
                this.alertMessage.message = error.message;
                this.alertMessage.success = false;
                this.timerHideAlert();
              }
            );
        }
      });
    });
  }

  timerHideAlert() {
    this.alertMessage.showAlertMsg = true;
    setTimeout(() => this.hideAlert(), 10000);
  }

  hideAlert() {
    this.alertMessage.showAlertMsg = false;
  }

  private generateSuccessMsg(arg: string) {
    this.alertMessage.message = 'The order ' + arg + ' was successfuly saved.';
  }

  openEditionDialog(selectedProduct?, selectedOrder?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      order: selectedOrder,
      product: selectedProduct
    };
    dialogConfig.width = "800px";
    dialogConfig.height = "1000px";
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
}

export interface CreateOrder {
  customerId: string;
  products: Product[];
  deliveryDate: number;
}
