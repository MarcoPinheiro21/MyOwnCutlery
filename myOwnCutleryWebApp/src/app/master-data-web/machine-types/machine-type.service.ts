import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MachineType } from 'src/app/models/machineType.model';
import { map, catchError } from 'rxjs/operators';

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

  getMachineTypeById(id : number): Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.url + 'machines/types/' + id)
      .pipe(map((response: [MachineType]) => {
        return response;
      })
      );
  }

  saveOperation(machineType: MachineType) : Observable<MachineType[]>{
    let body = <RequestBody>{};
    body.Desc = null;
    body.OperationList = this.extractOperationIdList(machineType);

    return this.http.put<MachineType[]>(
      this.url + 'machines/types/' + machineType.id + '/operations', body)
    .pipe(catchError(null));
  }

  private extractOperationIdList(machineType: MachineType): number[] {
    let result: number[] = [];
    machineType.operationList.forEach(op => {
      result.push(op.operationId);
    });
    return result;
  }
}

export interface RequestBody {
  Desc: string;
  OperationList: number[];
}
