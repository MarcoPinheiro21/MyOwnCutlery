import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://localhost:8090/productionApi/';

  constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.url + 'products').pipe(
        map((response: [Product]) => {
          return response;
        })
      );
    }
}
