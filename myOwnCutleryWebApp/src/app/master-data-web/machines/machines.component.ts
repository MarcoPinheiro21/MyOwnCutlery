import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachinesService } from './machines.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MachineType } from 'src/app/models/machineType.model';
import { MachineEditionDialogComponent } from './machine-edition-dialog/machine-edition-dialog.component';
import { MachineCreationDialogComponent } from './machine-creation-dialog/machine-creation-dialog.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[] = [];
  machineTypes: MachineType[] = [];
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
    this.getMachineTypes();

  }

  openEditionDialog(selectedMachine?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      machine: selectedMachine,
      machineTypes: this.machineTypes
    };
    dialogConfig.width = '425px';
    dialogConfig.height = '225px';

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
    dialogConfig.height = '225px';

    this.dialog.open(MachineCreationDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!!result) {
        return this.createMachine(result.data);
      }
    });
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

  getMachineTypes(): void {
    this.machinesService.getMachineTypes().subscribe((data: any) => {
      this.machineTypes = data;
    });
  }

  createMachine(machine) {
    this.machinesService.createMachine(machine).subscribe(() => {
      this.getMachines().then(success => {
        this.populateMachinesId();
      });
    });
  }

  updateMachine(machine) {
    this.machinesService.updateMachine(machine).subscribe(() => {
      this.getMachines().then(success => {
        this.populateMachinesId();
      });
    });
  }

}

export interface CreateMachine {
  description: string;
  machineTypeId: number;
}
