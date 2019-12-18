import { getRepository, getMongoRepository } from 'typeorm';
import { IOrdersRepository } from './iOrders.repository';
import { Order } from '../domain/order.domain';
import { OrderModel } from '../models/order.entity';
import { ModelMapper } from './model.mapper';
import { OrderInfo } from '../domain/orderInfo.domain';
import { OrderInfoModel } from '../models/orderInfo.entity';

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

    async deleteOrder(order: Order): Promise<Order> {
        let orderModel = await ModelMapper.createOrderModel(order);
        let result = await getRepository(OrderModel).remove(orderModel);
        return ModelMapper.createOrderDomain(result);
    }

    async findOrdersInfo(): Promise<OrderInfo[]> {
        let orderInfoModel = await getRepository(OrderInfoModel).find();
        let orderInfo: OrderInfo[] = [];
        for (let oi of orderInfoModel) {
            orderInfo.push(await ModelMapper.createOrderInfoDomain(oi));
        }
        return orderInfo;
    }

    async findOrdersInfoByProductId(productId: string): Promise<OrderInfo> {
        let orderInfoRepository = getMongoRepository(OrderInfoModel);
        let result = await orderInfoRepository.find({
            where: { productId: { $eq: productId } }
        });
        return await ModelMapper.createOrderInfoDomain(result[0]);;
    }

    async saveOrderInfo(orderInfo: OrderInfo): Promise<OrderInfo> {
        let oi = await ModelMapper.createOrderInfoModel(orderInfo);
        let result = await getRepository(OrderInfoModel).save(oi);
        return ModelMapper.createOrderInfoDomain(result);
    }
}