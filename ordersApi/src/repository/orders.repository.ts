import { getRepository, getMongoRepository } from 'typeorm';
import { IOrdersRepository } from './iOrders.repository';
import { Order } from '../models/order.entity';

export class OrdersRepository implements IOrdersRepository {

    async saveOrder(order: Order): Promise<Order> {
        return getRepository(Order).save(order);
    }

    async findAllOrders(): Promise<Order[]> {
        return getRepository(Order).find();

    }

    async findOrderById(id: string): Promise<Order> {
        return getRepository(Order).findOne(id);

    }

    async findOrdersByCustomerId(id: string): Promise<Order[]> {
        let orderRepository = getMongoRepository(Order);
        let orders = await orderRepository.find({
            where: { customerId: { $eq: id } }
        });
        return orders;
    }
}