import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authApi } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private authApiUrl: string = authApi.url;

  constructor(private http: HttpClient) { }

  getRoleByToken(token): Observable<any> {
    return this.http.get<any>(this.authApiUrl + '/users', {headers: {'x-access-token': token} });
  }

}
