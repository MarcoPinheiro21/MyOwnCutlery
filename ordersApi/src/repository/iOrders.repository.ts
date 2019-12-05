import { Order } from "src/domain/order.domain";

export interface IOrdersRepository {

    saveOrder(order: Order): Promise<Order>;

    findAllOrders(): Promise<Order[]>;

    findOrderById(id: string): Promise<Order>;

    findOrdersByCustomerId(id: string): Promise<Order[]>;

}
