import { Component, OnInit } from "@angular/core";
import { ClientService } from "./client.service";
import { Client } from "src/app/models/client.model";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ClientEditionDialogComponent } from './client-edition-dialog/client-edition-dialog.component';


@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})

export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  clientsService: ClientService;
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};

  constructor(_clientsService: ClientService, private myDialog: MatDialog) {
    this.clientsService = _clientsService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
  }

  ngOnInit() {
    this.getClients();
  }

  private getClients(): void {
    this.clientsService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

  openEditionDialog(selectedClient?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      client: selectedClient
    };
    dialogConfig.width = '425px';
    dialogConfig.height = '550px';

    this.dialog.open(ClientEditionDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!!result) {
        return this.updateClient(result.data);
      }
    });
  }

  updateClient(client) {
    this.clientsService.updateClient(client).subscribe(() => {
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
