import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachinesService } from './machines.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MachineDialogComponent } from './machine-dialog/machine-dialog.component';
import { MachineType } from 'src/app/models/machineType.model';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[] = [];
  machinesService: MachinesService;
  dialog: MatDialog;

  constructor(machinesService: MachinesService, private myDialog: MatDialog) {
    this.machinesService = machinesService;
    this.dialog = myDialog;
  }

  ngOnInit() {
    this.getMachines().then(success => {
      this.populateMachinesId();
    });
  }

  openDialog(editionMode, selectedMachine?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      machine: selectedMachine,
      isEdition: editionMode
    };
    dialogConfig.width = '15%';
    dialogConfig.height = '30%';


    this.dialog.open(MachineDialogComponent, dialogConfig);
  }

  getMachines(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.machinesService.getMachines().subscribe((data: any) => {
        resolve(this.machines = data);
      });
    });
  }

  populateMachinesId() {
    this.machines.map(mac => {
      this.machinesService.getMachineTypeById(mac.machineTypeId).subscribe((macType: any) => {
        mac.machineType = macType;
      });
    });
  }

}
