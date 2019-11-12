import { Component, OnInit } from '@angular/core';
import { MachineType } from 'src/app/models/machineType.model';
import { MachineTypeService } from './machine-type.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MachineTypeDialogComponent } from './machine-type-dialog/machine-type-dialog.component';

@Component({
  selector: 'app-machine-types',
  templateUrl: './machine-types.component.html',
  styleUrls: ['./machine-types.component.css']
})
export class MachineTypesComponent implements OnInit {

  machineTypes: MachineType[] = [];
  machineTypeService: MachineTypeService;
  dialog: MatDialog;

  constructor(_machineTypeService: MachineTypeService, myDialog: MatDialog) {
    this.machineTypeService=_machineTypeService;
    this.dialog=myDialog;
   }

  ngOnInit() {
    this.getMachineTypes();
  }

  private getMachineTypes(): void{
    this.machineTypeService.getMachineTypes().subscribe((data: any)=>{
      this.machineTypes=data;
    });
  }

  openDialog(editionMode, selectedOperation?) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      operation: selectedOperation,
      isEdition: editionMode
    };
    dialogConfig.width = '15%';
    dialogConfig.height = '30%';

    this.dialog.open(MachineTypeDialogComponent, dialogConfig);
  }
}
