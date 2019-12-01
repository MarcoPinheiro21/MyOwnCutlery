import { Order } from "src/models/order.entity";

export interface IOrdersRepository {

    saveOrder(order: Order): Promise<Order>;

    findAllOrders(): Promise<Order[]>;

    findOrderById(id: string): Promise<Order>;

    findOrdersByCustomerId(id: string): Promise<Order[]>;

}
