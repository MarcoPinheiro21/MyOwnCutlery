import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestProductionPlan } from 'src/app/models/request-production-plan.model';
import { catchError } from 'rxjs/operators';
import { productionPlanningApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductionPlanningScheduleService {

  private url = productionPlanningApi.url + '/production_planning/';

  constructor(private http: HttpClient) { }

  createProductionPlan(request: RequestProductionPlan): Observable<RequestProductionPlan[]> {
    return this.http
      .post<RequestProductionPlan[]>(this.url + 'begin_plan/', request)
      .pipe(catchError(null));
  }
}
