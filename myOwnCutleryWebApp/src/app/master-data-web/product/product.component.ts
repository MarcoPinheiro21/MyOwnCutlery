import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  factoryService: ProductsService;

  constructor(_factoryService: ProductsService) {
    this.factoryService = _factoryService;
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
    this.factoryService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

}
