import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResultModel } from '../models/loginResult.model';
import User from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { authApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authApiUrl: string = authApi.url;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>(this.authApiUrl + '/users/login', user);
  }

}
