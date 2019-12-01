import { OrderDto } from "src/dto/order.dto";
import { ReadOrderDto } from "src/dto/order.read.dto";
import { EditOrderDto } from "src/dto/order.edit.dto";

export interface IOrdersService {

    findAll(query: string): Promise<ReadOrderDto[]>;

    findById(orderId: string): Promise<ReadOrderDto>;

    createOrder(orderDto: OrderDto): Promise<ReadOrderDto>;

    findOrdersOfCustomerId(custId: string): Promise<ReadOrderDto[]>;

    cancelOrderById(orderId: string): Promise<ReadOrderDto>;

    updateOrder(id: string, orderDto: EditOrderDto): Promise<ReadOrderDto>;

}