import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RequestProductionPlan } from 'src/app/models/request-production-plan.model';
import { catchError } from 'rxjs/operators';
import { productionPlanningApi } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    responseType:  'text'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductionPlanningScheduleService {

  private url = productionPlanningApi.url + '/production_planning/';

  constructor(private http: HttpClient) { }

  createProductionPlan(request: RequestProductionPlan): Observable<RequestProductionPlan[]> {
   return this.http
      .post<RequestProductionPlan[]>(this.url + 'begin_plan', request, httpOptions);
  }


}
