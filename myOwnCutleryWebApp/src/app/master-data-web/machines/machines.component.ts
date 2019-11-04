import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachinesService } from './machines.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MachineDialogComponent } from './machine-dialog/machine-dialog.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[] = [];
  factoryService: MachinesService;
  dialog: MatDialog;

  constructor(_factoryService: MachinesService, private _dialog: MatDialog) {
    this.factoryService = _factoryService;
    this.dialog = _dialog;
  }

  ngOnInit() {
    this.getMachines();
  }

  // share() {
  //   window.alert('The product has been shared!');
  // }

  share() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.machines[0];

    this.dialog.open(MachineDialogComponent, dialogConfig);
}

  public getMachines(): void {
    this.factoryService.getMachines().subscribe((data: any) => {
      this.machines = data;
    });
  }

}
