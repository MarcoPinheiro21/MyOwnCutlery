import { OrderDto } from "src/dto/order.dto";
import { Order } from "src/models/order.entity";

export interface IOrdersService {

    findAll(): Promise<OrderDto[]>;

    findById(orderId : string) : Promise<OrderDto>;

    createOrder(orderDto: OrderDto): Promise<OrderDto>;

    findOrdersOfCustomerId(custId: string): Promise<OrderDto[]>;

    cancelOrderById(orderId : string) : Promise<OrderDto>;

    cancelOrderByCustomerId(customerId: string): Promise<OrderDto[]>;

    dtoToModel(orderDto: OrderDto): Promise<Order>;

}