import { Order } from "src/domain/order.domain";
import { OrderInfo } from "src/domain/orderInfo.domain";

export interface IOrdersRepository {

    saveOrder(order: Order): Promise<Order>;

    findAllOrders(): Promise<Order[]>;

    findOrderById(id: string): Promise<Order>;

    findOrdersByCustomerId(id: string): Promise<Order[]>;

    deleteOrder(order: Order): Promise<Order>;

    findOrdersInfo(): Promise<OrderInfo[]>;

    findOrdersInfoByProductId(productId: string): Promise<OrderInfo>;

    saveOrderInfo(orderInfo: OrderInfo): Promise<OrderInfo>;

}
