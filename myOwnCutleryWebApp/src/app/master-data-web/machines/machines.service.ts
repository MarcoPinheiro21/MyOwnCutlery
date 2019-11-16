import { Injectable } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachineType } from 'src/app/models/machineType.model';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from 'src/environments/environment';
import { CreateMachine } from './machines.component';
import { ProductionLine } from 'src/app/models/productionLine.model';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private url = api.url + '/factoryapi/';
  private machinesTypesByIdUrl = api.url + '/factoryapi/machines/types';
  private productionLinesByIdUrl = api.url + '/factoryapi/productionlines';

  constructor(private http: HttpClient) { }

  private getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.url + 'machines');
  }

  private getMachinesByType(id: number): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.url + 'machines' + '?type=' + id);
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

  updateMachine(machine: Machine): Observable<Machine[]> {
    return this.http.put<Machine[]>(
      this.url + 'machines/' + machine.id, machine)
      .pipe(catchError(null));
  }

  createMachine(machine: CreateMachine): Observable<CreateMachine[]> {
    return this.http.post<CreateMachine[]>(
      this.url + 'machines', machine)
      .pipe(catchError(null));
  }

  getByType(id: number): Observable<CreateMachine[]> {
    return this.getMachinesByType(id)
      .pipe(catchError(null));
  }

}
