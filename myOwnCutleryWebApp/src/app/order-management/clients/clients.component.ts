import { Component, OnInit } from "@angular/core";
import { ClientService } from "./client.service";
import { Client } from "src/app/models/client.model";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ClientEditionDialogComponent } from "./client-edition-dialog/client-edition-dialog.component";
import { ClientRightForgottenDialogComponent } from "./client-right-forgotten-dialog/client-right-forgotten-dialog.component";
import { OrderService } from "../orders/order.service";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  client: Client;
  clientsService: ClientService;
  orderService: OrderService;
  hasOrder = new Boolean(false);
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};

  constructor(_clientsService: ClientService, private myDialog: MatDialog, _orderService: OrderService) {
    this.clientsService = _clientsService;
    this.orderService = _orderService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
  }

  ngOnInit() {
    this.getClients();
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe((data: any) => {
      let userId = localStorage.getItem("user_id");
      this.clients = data.filter(client => client.userId === userId);
    });
  }

  private getClientsByUserId(client): void {
    this.clientsService.getClientsByUserId(client).subscribe((data: any) => {
      this.clients = data;
    });
  }

  private validatorOrder(): void {
    this.orderService.getOrders().subscribe((data: any) => {
      if (data.size > 0) {
        this.hasOrder = false;
      }
    });
  }

  openEditionDialog() {
    this.validatorOrder();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      client: this.clients[0]
    };
    dialogConfig.width = "425px";
    dialogConfig.height = "625px";

    this.dialog
      .open(ClientEditionDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (!!result) {
          return this.updateClient(result.data);
        }
      });
  }

  openRightForgottenDialog(selectedClient?) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      client: this.clients[0],
      hasOrder: this.hasOrder
    };
    dialogConfig.width = "555px";
    dialogConfig.height = "255px";

    this.dialog
      .open(ClientRightForgottenDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if(result!=null){
          return this.forgetClient();
        }
      });
  }

  updateClient(client) {
    this.clientsService.updateClient(client).subscribe(() => {
      this.getClients();
    });
  }

  forgetClient(){
    this.clientsService.forgetClient(this.clients[0]._id).subscribe(() => {
      this.getClients();
    });
  }

  timerHideAlert() {
    this.alertMessage.showAlertMsg = true;
    setTimeout(() => this.hideAlert(), 10000);
  }

  hideAlert() {
    this.alertMessage.showAlertMsg = false;
  }
}
export interface AlertMessage {
  message: string;
  showAlertMsg: boolean;
  success: boolean;
}
