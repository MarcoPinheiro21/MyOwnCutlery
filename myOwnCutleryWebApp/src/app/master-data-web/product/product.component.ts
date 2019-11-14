import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductionOperation } from 'src/app/models/productionOperation.model';
import { ProductsService } from './product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OperationsService } from 'src/app/master-data-web/operations/operations.service';
import { Operation } from 'src/app/models/operation.model';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

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

  constructor(_factoryService: OperationsService, _productionService: ProductsService, private myDialog: MatDialog) {
    this.productionService = _productionService;
    this.factoryService = _factoryService;
    this.dialog = myDialog;
  }

  ngOnInit() {
    this.getProducts();
  }

  // share() {
  //   window.alert('The product has been shared!');
  // }

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
        if (!!result) {
          return this.createProduct(result.data);
        }
      });
    });
  }

  createProduct(p) {
    this.productionService.createProduct(p).subscribe(() => {
      this.getProducts(); //smth
    });
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