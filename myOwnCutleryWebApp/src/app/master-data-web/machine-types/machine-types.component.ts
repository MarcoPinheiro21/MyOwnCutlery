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
  operations: Operation[]=[];
  machineTypeService: MachineTypeService;
  operationsService: OperationsService;
  dialog: MatDialog;

  constructor(_machineTypeService: MachineTypeService,
    _operationsService: OperationsService, myDialog: MatDialog) {
    this.machineTypeService=_machineTypeService;
    this.operationsService = _operationsService;
    this.dialog=myDialog;
   }

  ngOnInit() {
    this.getMachineTypes();
    this.getOperations();
  }

  private getMachineTypes(): void{
    this.machineTypeService.getMachineTypes().subscribe((data: any)=>{
      this.machineTypes=data;
    });
  }

  private getOperations(): void{
    this.operationsService.getOperations().subscribe((data: any)=>{
      this.operations=data;
    });
  }

  openDialog(editionMode, selectedmachinetype?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      machinetype: selectedmachinetype,
      listOperations: this.operations,
      isEdition: editionMode
    };
    dialogConfig.width = '45%';
    dialogConfig.height = '69%';

    this.dialog.open(MachineTypeDialogComponent, dialogConfig);
  }
}
