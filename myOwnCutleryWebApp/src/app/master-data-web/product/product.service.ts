import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ProductionOperation } from 'src/app/models/productionOperation.model';
import { CreateProduct } from './product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://localhost:8090/productionapi/';

  constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.url + 'products').pipe(
        map((response: [Product]) => {
          return response;
        })
      );
    }
    getPlan(productId): Observable<ProductionOperation[]> {
      return this.http.get<ProductionOperation[]>(this.url + 'products/'+productId+'/plan').pipe(
        map((response: [ProductionOperation]) => {
          return response;
        })
      );
    }

    createProduct(product: CreateProduct): Observable<CreateProduct[]> {
      return this.http.post<CreateProduct[]>(
        this.url + 'products', product)
        .pipe(catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.error));
        }));

    }
}
