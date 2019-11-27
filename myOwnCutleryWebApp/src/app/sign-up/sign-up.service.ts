import { Injectable } from '@angular/core';
import { ordersApi, authApi } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResultModel } from '../models/loginResult.model';
import User from '../models/user.model';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private authApiUrl: string = authApi.url;
  private ordersApiUrl: string = ordersApi.url;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(this.authApiUrl + '/users/register', user);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.ordersApiUrl + '/ordersapi/customers', client);
  }
}
