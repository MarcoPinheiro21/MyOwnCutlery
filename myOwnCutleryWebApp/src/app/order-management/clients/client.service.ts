import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client.model';
import { Address } from 'src/app/models/address.model';
import { map, catchError } from 'rxjs/operators';
import { api } from 'src/environments/environment';
import { CreateClient } from './clients.component';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  private url = api.url + '/factoryapi/';

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Client[]> {
    return new Observable((observer) => {
      let cl: Client[] = [{
        id:1,
        name:"Manel",
        vatNumber:123456789,
          address:{
            street:"Rua do Individuo",
            postalCode:4770123,
            town:"New Town"
          },
        phoneNumber:912345678,
        email:"test@testmail.com",
        priority:1
      }];
      // observable execution
      observer.next(cl);
      observer.complete();
    });
  }

  updateClient(client: Client): Observable<Client[]> {
    return this.http.put<Client[]>(
      this.url + 'clients/' + client.id, Address)
      .pipe(catchError(null));
  }

  createClient(client: CreateClient): Observable<CreateClient[]> {
    return this.http.post<CreateClient[]>(
      this.url + 'clients', client)
      .pipe(catchError(null));
  }
}

