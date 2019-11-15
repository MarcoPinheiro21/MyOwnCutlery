import { Component, OnInit } from '@angular/core';
import { ProductionLineService } from './production-lines.service';
import { ProductionLine } from 'src/app/models/productionLine.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Machine } from 'src/app/models/machine.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductionLineDialogComponent} from './production-line-dialog/production-line-dialog.component'

@Component({
  selector: 'app-production-lines',
  templateUrl: './production-lines.component.html',
  styleUrls: ['./production-lines.component.css']
})
export class ProductionLinesComponent implements OnInit {

  productionLineService: ProductionLineService;
  productionLines: ProductionLine[] = [];
  machines: Machine[] = [];
  dialog: MatDialog;

  constructor(prodLineService: ProductionLineService, private mydialog : MatDialog) {
    this.productionLineService = prodLineService;
    this.dialog = mydialog;
  }

  ngOnInit() {
    this.getProductionLines();
    this.getMachines();
  }

  private getProductionLines(): void {
    this.productionLineService.getProductionLines().subscribe((data: any) => {
      this.productionLines = data;
    });
  }

  getMachines(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productionLineService.getMachines().subscribe((data: any) => {
        resolve(this.machines = data);
      });
    });
  }

  createProductionLine(productionline: CreateProductionLine) {
    this.productionLineService.createProductionLine(productionline).subscribe(() => {
      this.getProductionLines();
    });

  }

  openCreationDialog() {
    
    this.productionLineService.getMachines().subscribe((data : any)=> {
    

    
    const dialogConfig = new MatDialogConfig();
    const productionline: CreateProductionLine= {
      ProductionLineName: '',
      MachinesListIds: []
    };

    dialogConfig.data = {
      productionline,
      machines : data
    };
    dialogConfig.width = '425px';
    dialogConfig.height = '265px';

    this.dialog.open(ProductionLineDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if(!!result){
        return this.createProductionLine(result.data);
      }
    });
  
  });
}
}
export interface CreateProductionLine {
  ProductionLineName: string;
  MachinesListIds: number[];
}



