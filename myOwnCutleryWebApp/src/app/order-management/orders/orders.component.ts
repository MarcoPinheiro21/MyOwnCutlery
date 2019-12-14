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
import { OrderCancelationDialogComponent } from './order-cancelation-dialog/order-cancelation-dialog.component';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {

  private dialogWidth: any = '800px';
  private dialogHeight: any = '600px';
  private dialogHeightSmall:any = '255px'


  orders: Order[] = [];
  ordersService: OrderService;
  productsService: ProductsService;
  products: Product[]; //for creation
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};
  thisClient: Client;
  privileges: any;
  orderInfo: OrderInfo[] = [];

  constructor(_ordersService: OrderService, private myDialog: MatDialog) {
    this.ordersService = _ordersService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
  }

  ngOnInit() {
    this.privileges = JSON.parse(localStorage.getItem('user_privileges'));
    this.getOrders();
    this.ordersService.getOrdersInfo().subscribe((data: any) => {
      this.orderInfo = data;
    })
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

      if (!this.privileges.checkAllOrders) {
        this.ordersService.getClients().subscribe((data: any) => {
          this.thisClient = data.filter(client => client.userId === userId);
          this.orders = ordersData.filter(
            order => order.customerDetails.id === this.thisClient[0]._id
          );
        });
      } else {
        this.orders = ordersData;
      }
    });
  }


  openCreationDialog() {

    this.ordersService.getOrdersInfo().subscribe((data: any) => {
      this.orderInfo = data;


      this.ordersService.getProducts().subscribe((data: any) => {
        let productInfo = this.responseToProductInfo(data);
        var ids = [];
        data.forEach(pElement =>
          ids.push(pElement.productId)
        );

        this.fillOrdersInfo(productInfo);

        this.ordersService.getProductionTimes(ids).subscribe((pTimes: any) => {
          for (var i = 0; i < ids.length; i++) {
            productInfo[i]['productionTime'] = pTimes[i];
          }
          const dialogConfig = new MatDialogConfig();
          const order = {
            clientId: String,
            products: OrderLine,
            deliveryDate: Date
          };
          dialogConfig.data = {
            products: productInfo,
            client: this.thisClient[0]._id,
          };
          dialogConfig.width = this.dialogWidth;
          dialogConfig.height = this.dialogHeight;
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
      });
    });
  }

  private responseToProductInfo(data: any): ProductInfo[] {
    let products: ProductInfo[] = [];
    data.forEach(element => {
      products.push(<ProductInfo>{
        planId: element.planId,
        productId: element.productId,
        productName: element.productName,
        sumQuantity: 0,
        totalOrders: 0
      })
    });
    return products;
  }

  private fillOrdersInfo(products: ProductInfo[]): Promise<void> {
    products.forEach(async element => {
      let orderInfo = this.orderInfo.find(oInfo => (oInfo.productId == element.productId.toString()));
      element.sumQuantity = orderInfo == undefined ? 0 : orderInfo.sumQuantity;
      element.totalOrders = orderInfo == undefined ? 0 : orderInfo.totalOrders;
    });
    return;
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

  openEditionDialog(selectedOrder?) {
    this.ordersService.getProducts().subscribe((data: any) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        order: selectedOrder,
        products: data
      };
      dialogConfig.width = this.dialogWidth;
      dialogConfig.height = this.dialogHeight;
      this.dialog
        .open(OrderEditionDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe(result => {
          if (!!result) {
            this.ordersService.updateOrder(result.data).subscribe(() => {
              this.getOrders();
            });
          }
        });
    });
  }

  openCancelationDialog(selectOrder?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      order: selectOrder
    };
    dialogConfig.width = this.dialogWidth;
    dialogConfig.height = this.dialogHeightSmall;

    this.dialog
      .open(OrderCancelationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        return this.cancelOrder(result.order);
      });
  }

  cancelOrder(order) {
    this.ordersService.cancelOrder(order).subscribe(() => {
      this.getOrders();
    });

  }
}
export interface CreateOrder {
  customerId: string;
  products: Product[];
  deliveryDate: number;
}

export class ProductInfo {
  productId: number;
  productName: string;
  planId: number;
  sumQuantity = 0;
  totalOrders = 0;
}

export class OrderInfo {
  productId: string;
  sumQuantity: number;
  totalOrders: number;
}
