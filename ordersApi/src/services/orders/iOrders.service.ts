import { OrderDto } from "src/dto/order.dto";
import { Order } from "src/models/order.entity";
import { ReadOrderDto } from "src/dto/order.read.dto";

export interface IOrdersService {

    findAll(query : string): Promise<ReadOrderDto[]>;

    findById(orderId : string) : Promise<ReadOrderDto>;

    createOrder(orderDto: OrderDto): Promise<ReadOrderDto>;

    findOrdersOfCustomerId(custId: string): Promise<ReadOrderDto[]>;

    cancelOrderById(orderId : string) : Promise<ReadOrderDto>;

}