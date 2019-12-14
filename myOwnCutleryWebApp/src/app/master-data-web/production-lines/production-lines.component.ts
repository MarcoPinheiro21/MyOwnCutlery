import { Component, OnInit } from '@angular/core';
import { ProductionLineService } from './production-lines.service';
import { ProductionLine } from 'src/app/models/productionLine.model';
import { Machine } from 'src/app/models/machine.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductionLineDialogComponent } from './production-line-dialog/production-line-dialog.component';
import { MachineType } from 'src/app/models/machineType.model';


@Component({
  selector: 'app-production-lines',
  templateUrl: './production-lines.component.html',
  styleUrls: ['./production-lines.component.css']
})
export class ProductionLinesComponent implements OnInit {

  productionLineService: ProductionLineService;
  productionLines: ProductionLine[] = [];
  machineTypes: MachineType[] = [];
  machines: Machine[] = [];
  dialog: MatDialog;

  constructor(prodLineService: ProductionLineService, private mydialog: MatDialog) {
    this.productionLineService = prodLineService;
    this.dialog = mydialog;
  }

  ngOnInit() {
    this.getAllInfo();
  }

  getAllInfo() {
    this.productionLineService.getAll().subscribe(responseList => {
      this.machines = responseList[0];
      this.machineTypes = responseList[1];
      this.productionLines = responseList[2];
      this.machines.map(mac => {
        mac.machineType = this.machineTypes.filter(mType => mType.id === mac.machineTypeId)[0];
      });
      this.productionLines.map(pl => {
        pl.machinesListDtos = this.machines.filter(mac => mac.productionLineId === pl.productionLineId);
      });
    });
  }

  createProductionLine(productionline: CreateProductionLine) {
    this.productionLineService.createProductionLine(productionline).subscribe(() => {
      this.getAllInfo();
    });
  }

  openCreationDialog() {
    const dialogConfig = new MatDialogConfig();
    const productionline: CreateProductionLine = {
      ProductionLineName: '',
      MachinesListIds: []
    };

    dialogConfig.data = {
      productionline,
      machines: this.machines.filter(m => m.productionLineId == 0)
    };
    dialogConfig.width = '700px';
    dialogConfig.height = '500px';

    this.dialog.open(ProductionLineDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!!result) {
        return this.createProductionLine(result.data);
      }
    });
  }

}

export interface CreateProductionLine {
  ProductionLineName: string;
  MachinesListIds: number[];
}



