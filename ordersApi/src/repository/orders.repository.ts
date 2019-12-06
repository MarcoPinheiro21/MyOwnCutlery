import { getRepository, getMongoRepository } from 'typeorm';
import { IOrdersRepository } from './iOrders.repository';
import { Order } from 'src/domain/order.domain';
import { OrderModel } from 'src/models/order.entity';
import { ModelMapper } from './model.mapper';

export class OrdersRepository implements IOrdersRepository {

    async saveOrder(order: Order): Promise<Order> {
        let orderModel = await ModelMapper.createOrderModel(order);
        let result = await getRepository(OrderModel).save(orderModel);
        return ModelMapper.createOrderDomain(result);
    }

    async findAllOrders(): Promise<Order[]> {
        let result = await getRepository(OrderModel).find();
        let orders: Order[] = [];
        for (let o of result) {
            orders.push(await ModelMapper.createOrderDomain(o));
        }
        return orders;
    }

    async findOrderById(id: string): Promise<Order> {
        let result = await getRepository(OrderModel).findOne(id);
        return ModelMapper.createOrderDomain(result);

    }

    async findOrdersByCustomerId(id: string): Promise<Order[]> {
        let orderRepository = getMongoRepository(OrderModel);
        let result = await orderRepository.find({
            where: { customerId: { $eq: id } }
        });
        let orders: Order[] = [];
        for (let o of result) {
            orders.push(await ModelMapper.createOrderDomain(o));
        }
        return orders;
    }

    async deleteOrder(order: Order) : Promise<Order>{
        let orderModel = await ModelMapper.createOrderModel(order);
        let result = await getRepository(OrderModel).remove(orderModel);
        console.log(result);
        return ModelMapper.createOrderDomain(result);
    }
}