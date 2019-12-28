import { OrderDto } from "../../dto/order.dto";
import { ReadOrderDto } from "../../dto/order.read.dto";
import { EditOrderDto } from "../../dto/order.edit.dto";
import { OrderInfoDto } from "../../dto/orderInfo.read.dto";

export interface IOrdersService {

    findAll(query: string): Promise<ReadOrderDto[]>;

    findById(orderId: string): Promise<ReadOrderDto>;

    createOrder(orderDto: OrderDto): Promise<ReadOrderDto>;

    findOrdersOfCustomerId(custId: string): Promise<ReadOrderDto[]>;

    cancelOrderById(orderId: string): Promise<ReadOrderDto>;

    updateOrder(id: string, orderDto: EditOrderDto): Promise<ReadOrderDto>;

    deleteOrder(id: string) : Promise<ReadOrderDto>;

    findAllOrdersInfo(): Promise<OrderInfoDto[]>;

    updateExpectedDeliveryDate(orderId:string, date:string) : Promise<ReadOrderDto>;

}