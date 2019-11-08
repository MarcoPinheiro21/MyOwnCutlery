import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MachineType } from 'src/app/models/machineType.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MachineTypeService {

  private url = 'https://localhost:5001/factoryapi/';

  constructor(private http: HttpClient) { }

  getMachineTypes(): Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.url + 'machines/types')
    .pipe(map((response: [MachineType]) => {
        return response;
      })
    );
  }
}
