import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Client } from "src/app/models/client.model";
import { catchError } from "rxjs/operators";
import { ordersApi } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  private url = ordersApi.url + "/ordersapi/";

  constructor(private http: HttpClient) {}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + "customers");
  }

  public getClientsByUserId(Client): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + "customers" + Client.userId);
  }

  updateClient(client: Client): Observable<Client[]> {
    return this.http
      .put<Client[]>(this.url + "customers/" + client._id, client)
      .pipe(catchError(null));
  }

  forgetClient(clientId): Observable<Client[]> {
    return this.http
      .post<Client[]>(this.url + "customers/forget/" + clientId, Client)
      .pipe(catchError(null));
  }
}
