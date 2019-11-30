import { Injectable } from "@angular/core";
import { ordersApi, productionApi } from "src/environments/environment";
import { Observable } from "rxjs";
import { Order } from "src/app/models/order.models";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { OrderLine } from 'src/app/models/order-line.model';
import { CreateOrder } from './orders.component';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private url = ordersApi.url + "/ordersapi/";
  private urlProduction = productionApi.url + "/productionapi/products/";

  constructor(private http: HttpClient) { }

  private getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + 'orders');
  }

  public getOrdersAndOrderLines(): Observable<any> {
    let orders: Order[];
    return new Observable((observer) => {
      this.getOrders().subscribe((data: Order[]) => {
        orders = data;
        let orderLines: OrderLine[];
        orders.map(order => {
          order.products.map(productOrder => {
            this.getProductById(productOrder['productId']).subscribe((product: any) => {
              let orderLine: OrderLine = {
                orderId: order['_id'],
                productName: product.productName,
                quantity: productOrder.quantity
              }
              orderLines.push(orderLine);
            });
          });
        });
      });
    });
  }

  private getOrdersById(Order): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + "orders/" + Order._id);
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

  getProductById(productId): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.urlProduction + productId
    )
  }
}