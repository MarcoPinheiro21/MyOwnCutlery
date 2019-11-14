import { Injectable, ErrorHandler } from '@angular/core';
import { Operation } from 'src/app/models/operation.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MachineType } from 'src/app/models/machineType.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private url = 'https://localhost:5001/factoryapi/';

  constructor(private http: HttpClient) { }

  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.url + 'operations').pipe(
      map((response: [Operation]) => {
        return response;
      })
    );
  }

}