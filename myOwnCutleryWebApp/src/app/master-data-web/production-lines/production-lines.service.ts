import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ProductionLine} from 'src/app/models/productionLine.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Machine } from 'src/app/models/machine.model';
import { CreateProductionLine } from './production-lines.component';


@Injectable({
  providedIn: 'root'
})

export class ProductionLineService {

  private url = 'https://localhost:5001/factoryapi/';
  
  

  constructor(private http : HttpClient ) {}

    getProductionLines() : Observable<ProductionLine[]> {
        return this.http.get<ProductionLine[]>(this.url + 'productionlines')
        .pipe(map((response: [ProductionLine])=>{
            return response;
          })
        );
    }

    getMachines(): Observable<Machine[]> {
      return this.http.get<Machine[]>(this.url + 'machines').pipe(
        map((response: [Machine]) => {
          return response;
        })
      );
    }

    createProductionLine(productionline: CreateProductionLine): Observable<CreateProductionLine[]> {
      return this.http.post<CreateProductionLine[]>(
        this.url + 'productionlines', productionline)
      .pipe(catchError(null));

    }
  }
   
   