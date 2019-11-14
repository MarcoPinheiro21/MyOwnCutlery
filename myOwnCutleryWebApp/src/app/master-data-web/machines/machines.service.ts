import { Injectable } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachineType } from 'src/app/models/machineType.model';
import { Observable } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from 'src/environments/environment';
import { CreateMachine } from './machines.component';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private url = api.url + '/factoryapi/';
  private machinesTypesByIdUrl = api.url + '/factoryapi/machines/types/{id}';

  constructor(private http: HttpClient) { }

    getMachines(): Observable<Machine[]> {
      return this.http.get<Machine[]>(this.url + 'machines').pipe(
        map((response: [Machine]) => {
          return response;
        })
      );
    }

    getMachineTypes(): Observable<MachineType[]> {
      return this.http.get<MachineType[]>(this.url + 'machines/types').pipe(
        map((response: [MachineType]) => {
          return response;
        })
      );
    }

    getMachineTypeById(id): Observable<MachineType[]> {
      return this.http.get<MachineType[]>(this.replace(this.machinesTypesByIdUrl, id)).pipe(
        map((response: [MachineType]) => {
          return response;
        })
      );
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

    replace(url: string, id) {
      return url.replace('{id}', id);
    }

}
