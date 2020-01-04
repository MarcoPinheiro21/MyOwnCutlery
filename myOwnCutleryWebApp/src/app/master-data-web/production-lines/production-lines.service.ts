import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductionLine } from 'src/app/models/productionLine.model';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Machine } from 'src/app/models/machine.model';
import { CreateProductionLine } from './production-lines.component';
import { api } from 'src/environments/environment';
import { MachineType } from 'src/app/models/machineType.model';


@Injectable({
  providedIn: 'root'
})

export class ProductionLineService {

  private url = api.url + '/factoryapi/';
  private machinesTypesByIdUrl = api.url + '/factoryapi/machines/types';
  private productionLinesByIdUrl = api.url + '/factoryapi/productionlines';

  constructor(private http: HttpClient) { }

  private getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.url + 'machines');
  }

  private getMachineTypes(): Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.machinesTypesByIdUrl);
  }

  private getProductionLines(): Observable<ProductionLine[]> {
    return this.http.get<ProductionLine[]>(this.productionLinesByIdUrl);
  }

  getAll(): Observable<any[]> {
    const response1 = this.getMachines();
    const response2 = this.getMachineTypes();
    const response3 = this.getProductionLines();
    return forkJoin([response1, response2, response3]);
  }

  createProductionLine(productionline: CreateProductionLine): Observable<CreateProductionLine[]> {
    return this.http.post<CreateProductionLine[]>(
      this.url + 'productionlines', productionline)
      .pipe(catchError(null));
  }

  updateProductionLine(productionline: ProductionLine, id: number): Observable<ProductionLine[]> {
    return this.http.put<ProductionLine[]>(
      this.url + 'productionlines/' + id, productionline)
      .pipe(catchError(null));
  }

}

