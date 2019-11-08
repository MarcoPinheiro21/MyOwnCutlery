import { Injectable } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MachineType } from 'src/app/models/machineType.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private url = 'https://localhost:5001/factoryapi/';
  private machinesTypesByIdUrl = 'https://localhost:5001/factoryapi/machines/types/{id}';

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

    replace(url: string, id) {
      return url.replace('{id}', id);
    }
}
