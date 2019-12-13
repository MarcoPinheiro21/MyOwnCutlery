import { Injectable } from "@angular/core";
import { ordersApi, productionApi } from "src/environments/environment";
import { Observable } from "rxjs";
import { Order } from "src/app/models/order.model";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { CreateOrder } from './orders.component';
import { Product } from 'src/app/models/product.model';
import { Client } from 'src/app/models/client.model';

@Injectable({
  providedIn: "root"
})
export class OrderService {

  private url = ordersApi.url + "/ordersapi/";
  private urlProduction = productionApi.url + "/productionapi/products/";

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + 'orders?includeCancelled=true');
  }

  private getOrdersById(Order): Observable<Order> {
    return this.http.get<Order>(this.url + "orders/" + Order._id);
  }

  updateOrder(order: Order): Observable<Order> {
    var body= {
      _id:order._id,
      deliveryDate:order.deliveryDate,
      deliveryAddress:order.customerDetails.deliveryAddress,
      products:order.products
    }
    return this.http
      .put<Order>(this.url + "orders/" + order._id, body)
      .pipe(catchError(null));
  }

  createOrder(client: CreateOrder): Observable<CreateOrder[]> {
    return this.http
      .post<CreateOrder[]>(this.url + "orders/", client)
      .pipe(catchError(null));
  }

  getProductById(productId): Observable<Product> {
    return this.http.get<Product>(
      this.urlProduction + productId
    )
  }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(
      this.urlProduction
    )
  }
  getProductionTimes(ids): Observable<number[]> {
    return this.http.post<number[]>(
      this.urlProduction + "productiontime",ids
    )
  }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + 'customers');
  }

  cancelOrder(order: Order): Observable<Order[]> {
   return this.http
   .put<Order[]>(this.url + 'orders/' + order['_id'] + '/cancel', order)
   .pipe(catchError(null));
  }

}
