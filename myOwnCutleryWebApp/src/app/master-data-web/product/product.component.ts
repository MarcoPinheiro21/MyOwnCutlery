import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductionOperation } from 'src/app/models/productionOperation.model';
import { ProductsService } from './product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OperationsService } from 'src/app/master-data-web/operations/operations.service';
import { Operation } from 'src/app/models/operation.model';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { AlertMessage } from '../machine-types/machine-types.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  operations: Operation[] = [];
  productionService: ProductsService;
  factoryService: OperationsService;
  dialog: MatDialog;
  alertMessage: AlertMessage = <AlertMessage>{};

  constructor(_factoryService: OperationsService, _productionService: ProductsService, private myDialog: MatDialog) {
    this.productionService = _productionService;
    this.factoryService = _factoryService;
    this.dialog = myDialog;
  }

  ngOnInit() {
    this.getProducts();
  }

  share() {

  }

  public getProducts(): void {
    this.productionService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.products.forEach(element => {
        this.productionService.getPlan(element.productId).subscribe((data: any) => {
          element.operations = data;
        });
      });
    });
  }

  openDialog() {
    this.factoryService.getOperations().subscribe((data: any) => {
      this.operations = data;

      const dialogConfig = new MatDialogConfig();


      const product = {
        productName: '',
        plan: <CreatePlan>{
          operations: []
        }
      };

      dialogConfig.data = {
        product,
        operations: this.operations
      };
      dialogConfig.width = '600px';
      dialogConfig.height = '400px';

      this.dialog.open(ProductDialogComponent, dialogConfig).afterClosed().subscribe(result => {
        if (result != undefined) {
          this.productionService
            .createProduct(result.data)
            .subscribe(
              () => {
                var mt = result.data.productName;
                this.generateSuccessMsg(mt);
                this.alertMessage.success = true;
                this.getProducts();
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
    });
  }

  timerHideAlert() {
    this.alertMessage.showAlertMsg = true;
    setTimeout(() => this.hideAlert(), 10000);
  }

  hideAlert() {
    this.alertMessage.showAlertMsg = false;
  }

  private generateSuccessMsg(arg: string) {
    this.alertMessage.message = 'The product ' + arg + ' was successfuly saved.';
  }

}

export interface CreateProduct {
  productName: string;
  plan: CreatePlan;
}
export interface CreatePlan {
  operations: CreateOperation[];
}
export interface CreateOperation {
  operationId: number;
}