import { Injectable } from "@angular/core";
import { ordersApi } from "src/environments/environment";
import { Observable } from "rxjs";
import { Order } from "src/app/models/order.model";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { CreateOrder } from "./orders.component";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private url = ordersApi.url + "/ordersapi/";

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + "orders");
  }
  public getOrdersById(Order): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + "orders" + Order);
  }

  updateOrder(order: Order): Observable<Order[]> {
    return this.http
      .put<Order[]>(this.url + "orders/" + order._id, Order)
      .pipe(catchError(null));
  }

  createOrder(client: CreateOrder): Observable<CreateOrder[]> {
    return this.http
      .post<CreateOrder[]>(this.url + "orders/", client)
      .pipe(catchError(null));
  }
}
