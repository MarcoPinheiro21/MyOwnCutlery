import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachinesService } from './machines.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MachineType } from 'src/app/models/machineType.model';
import { MachineEditionDialogComponent } from './machine-edition-dialog/machine-edition-dialog.component';
import { MachineCreationDialogComponent } from './machine-creation-dialog/machine-creation-dialog.component';
import { ProductionLine } from 'src/app/models/productionLine.model';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[] = [];
  machineTypes: MachineType[] = [];
  productionLines: ProductionLine[] = [];
  machinesService: MachinesService;
  dialog: MatDialog;

  constructor(machinesService: MachinesService, private myDialog: MatDialog) {
    this.machinesService = machinesService;
    this.dialog = myDialog;
  }

  ngOnInit() {
    this.getAllInfo();
  }

  openEditionDialog(selectedMachine?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      machine: selectedMachine,
      machineTypes: this.machineTypes
    };
    dialogConfig.width = '425px';
    dialogConfig.height = '260px';

    this.dialog.open(MachineEditionDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!!result) {
        return this.updateMachine(result.data);
      }
    });
  }

  openCreationDialog() {
    const dialogConfig = new MatDialogConfig();
    const machine = {
      description: '',
      machineTypeId: 0
    };

    dialogConfig.data = {
      machine,
      machineTypes: this.machineTypes
    };
    dialogConfig.width = '425px';
    dialogConfig.height = '260px';

    this.dialog.open(MachineCreationDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!!result) {
        return this.createMachine(result.data);
      }
    });
  }

  getAllInfo() {
    this.machinesService.getAll().subscribe(responseList => {
      this.machines = responseList[0];
      this.machineTypes = responseList[1];
      this.productionLines = responseList[2];
      this.machines.map(mac => {
        mac.machineType = this.machineTypes.filter(mType => mType.id === mac.machineTypeId)[0];
        if (mac.productionLineId !== 0) {
          mac.productionLine = this.productionLines.filter(pl => pl.productionLineId === mac.productionLineId)[0];
        }
      });
    });
  }

  createMachine(machine) {
    this.machinesService.createMachine(machine).subscribe(() => {
      this.getAllInfo();
    });
  }

  updateMachine(machine) {
    this.machinesService.updateMachine(machine).subscribe(() => {
      this.getAllInfo();
    });
  }

}

export interface CreateMachine {
  description: string;
  machineTypeId: number;
}
