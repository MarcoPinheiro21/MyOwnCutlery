import { Component, OnInit } from '@angular/core';
import { MachineType } from 'src/app/models/machineType.model';
import { MachineTypeService } from './machine-type.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MachineTypeDialogComponent } from './machine-type-dialog/machine-type-dialog.component';
import { OperationsService } from '../operations/operations.service';
import { Operation } from 'src/app/models/operation.model';

@Component({
  selector: 'app-machine-types',
  templateUrl: './machine-types.component.html',
  styleUrls: ['./machine-types.component.css']
})
export class MachineTypesComponent implements OnInit {

  machineTypes: MachineType[] = [];
  operations: Operation[] = [];
  machineTypeService: MachineTypeService;
  operationsService: OperationsService;
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};

  constructor(_machineTypeService: MachineTypeService,
    _operationsService: OperationsService, myDialog: MatDialog) {
    this.machineTypeService = _machineTypeService;
    this.operationsService = _operationsService;
    this.dialog = myDialog;
    this.alertMessage.showAlertMsg = false;
    this.alertMessage.message="wdsfewfwe";
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


  openDialog(editionMode, selectedmachinetype?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      machinetype: selectedmachinetype,
      listOperations: this.operations,
      isEdition: editionMode
    };
    dialogConfig.width = '35%';
    dialogConfig.height = '45%';

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
}

export interface AlertMessage {
  message: string;
  showAlertMsg: boolean;
  success: boolean;
}