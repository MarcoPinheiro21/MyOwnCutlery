import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MachineType } from 'src/app/models/machineType.model';
import { map, catchError, windowWhen } from 'rxjs/operators';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachineTypeService {


  private url = api.url + '/factoryapi/';
  private resource = 'machines/types/';

  constructor(private http: HttpClient) { }

  getMachineTypes(): Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.url + this.resource)
      .pipe(map((response: [MachineType]) => {
        return response;
      })
      );
  }

  getMachineTypeById(id: number): Observable<MachineType[]> {
    return this.http.get<MachineType[]>(this.url + this.resource + id)
      .pipe(map((response: [MachineType]) => {
        return response;
      })
      );
  }

  saveOperation(machineType: MachineType, isEdition: boolean): Observable<MachineType[]> {
    let body = <RequestBody>{};
    isEdition ? body.Desc = null : body.Desc = machineType.desc;
    body.OperationList = this.extractOperationIdList(machineType);

    return isEdition ?
      this.http.put<MachineType[]>(this.url + this.resource + machineType.id + '/operations', body)
        .pipe(catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.error));
        })) :
      this.http.post<MachineType[]>(this.url + this.resource, body)
        .pipe(catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.error));
        }));
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
