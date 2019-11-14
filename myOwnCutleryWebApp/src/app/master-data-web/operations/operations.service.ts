import { Injectable } from "@angular/core";
import { OperationType } from "src/app/models/operationType.model";
import { Operation } from "src/app/models/operation.model";
import { Tool } from "src/app/models/tool.model";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CreateOperation } from "./operations.component";
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class OperationsService {
  private url = api.url + '/factoryapi/';

  constructor(private http: HttpClient) {}

  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.url + "operations").pipe(
      map((response: [Operation]) => {
        return response;
      })
    );
  }

  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.url + "operations/tools").pipe(
      map((response: [Tool]) => {
        return response;
      })
    );
  }

  getOperationTypes(): Observable<OperationType[]> {
    return this.http.get<OperationType[]>(this.url + "operations/operationTypes").pipe(
      map((response: [OperationType]) => {
        return response;
      })
    );
  }
  createOperation(operation: CreateOperation): Observable<CreateOperation[]> {
    return this.http
      .post<CreateOperation[]>(this.url + "operations", operation)
      .pipe(catchError(null));
  }

  replace(url: string, id) {
    return url.replace("{id}", id);
  }
}
