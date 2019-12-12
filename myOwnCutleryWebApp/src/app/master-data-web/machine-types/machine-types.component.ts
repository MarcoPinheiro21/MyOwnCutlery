import { Component, OnInit } from '@angular/core';
import { MachineType } from 'src/app/models/machineType.model';
import { MachineTypeService } from './machine-type.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MachineTypeDialogComponent } from './machine-type-dialog/machine-type-dialog.component';
import { OperationsService } from '../operations/operations.service';
import { Operation } from 'src/app/models/operation.model';
import { MachinesService } from '../machines/machines.service';
import { Machine } from 'src/app/models/machine.model';
import { MachinesByTypeDialogComponent } from './machines-by-type-dialog/machines-by-type-dialog.component';
import { Observable } from 'rxjs';
import { Promise } from 'q';

@Component({
  selector: 'app-machine-types',
  templateUrl: './machine-types.component.html',
  styleUrls: ['./machine-types.component.css']
})
export class MachineTypesComponent implements OnInit {

  machineTypes: MachineType[] = [];
  operations: Operation[] = [];
  machines: Machine[] = null;
  machinesService: MachinesService;
  machineTypeService: MachineTypeService;
  operationsService: OperationsService;
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};

  constructor(_machineTypeService: MachineTypeService,
    _operationsService: OperationsService,
    _machinesService: MachinesService,
    myDialog: MatDialog) {
    this.machineTypeService = _machineTypeService;
    this.operationsService = _operationsService;
    this.machinesService = _machinesService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
    this.alertMessage.message = '';
  }

  ngOnInit() {
    this.getMachineTypes();
    this.getOperations();
  }

  private getMachineTypes(): void {
    this.machineTypeService.getMachineTypes().subscribe((data: any) => {
      this.machineTypes = data;
    });
  }

  private getOperations(): void {
    this.operationsService.getOperations().subscribe((data: any) => {
      this.operations = data;
    });
  }



  private generateSuccessMsg(arg: string) {
    this.alertMessage.message = 'The machine type ' + arg + ' was successfuly saved.';
  }

  timerHideAlert() {
    this.alertMessage.showAlertMsg = true;
    setTimeout(() => this.hideAlert(), 10000);
  }

  hideAlert() {
    this.alertMessage.showAlertMsg = false;
  }

  private generateDialogConfig(editionMode: boolean, selectedmachinetype?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      machinetype: selectedmachinetype,
      listOperations: this.operations,
      machinesList: this.machines,
      isEdition: editionMode
    };
    dialogConfig.width = '55%';
    dialogConfig.height = '65%';
    return dialogConfig;
  }


  openDialog(editionMode, selectedmachinetype?) {

    let dialogConfig = this.generateDialogConfig(editionMode, selectedmachinetype);
    let dialogRef = this.dialog.open(MachineTypeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.machineTypeService
          .saveOperation(result.data, dialogConfig.data.isEdition)
          .subscribe(
            () => {
              var mt = <MachineType>result.data;
              this.generateSuccessMsg(mt.desc);
              this.alertMessage.success = true;
              this.getMachineTypes();
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
  }

  getMachinesByType(id: number){
    const promise = this.machinesService.getByType(id).toPromise();
    promise.then((data: Machine[]) => {
      this.machines = data;
      this.openMachinesByTypeDialog();
    })
  }

  private openMachinesByTypeDialog() {
    let dialogConfig = this.generateDialogConfig(false, null);
    let dialogRef = this.dialog.open(MachinesByTypeDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => { });
  }

}

export interface AlertMessage {
  message: string;
  showAlertMsg: boolean;
  success: boolean;
}
