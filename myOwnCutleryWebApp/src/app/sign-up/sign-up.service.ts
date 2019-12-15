import { Injectable } from '@angular/core';
import { ordersApi, authApi } from 'src/environments/environment';
import { LoginResultModel } from '../models/loginResult.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import User from '../models/user.model';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private authApiUrl: string = authApi.url + '/users/register';
  private customersOrdersApiUrl: string = ordersApi.url + '/ordersapi/customers/';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(this.authApiUrl, user);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.customersOrdersApiUrl, client);
  }

  updateClient(client: Client): Observable<Client[]> {
    return this.http
      .put<Client[]>(this.customersOrdersApiUrl + client._id, client)
      .pipe(catchError(null));
  }

  deleteClient(client: Client): Observable<Client[]> {
    return this.http.delete<Client[]>(this.customersOrdersApiUrl + client._id, httpOptions)
    .pipe(catchError(null));
  }

}
