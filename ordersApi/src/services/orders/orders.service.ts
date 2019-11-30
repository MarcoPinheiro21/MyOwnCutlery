import { Injectable, HttpException, Inject } from '@nestjs/common';
import { OrderDto } from '../../dto/order.dto';
import { Order } from 'src/models/order.entity';
import { Product } from 'src/models/product.entity';
import { ProductDto } from '../../dto/product.dto';
import { getRepository, getMongoManager, getMongoRepository } from 'typeorm';
import { ICustomersService } from '../customers/iCustomers.service';
import { IOrdersService } from './iOrders.service';
import { OrderStates } from 'src/enums/orderStates.enum';


@Injectable()
export class OrdersService implements IOrdersService {

    constructor(@Inject('ICustomersService') private readonly customerService: ICustomersService) {
    }

    public async findAll(): Promise<OrderDto[]> {
        let ordersDto: OrderDto[] = [];
        let orders = await this.findAll_();
        orders.forEach(async element => {
            ordersDto.push(await element.toDto());
        });
        return ordersDto;
    }

    private async findAll_(): Promise<Order[]> {
        return await getRepository(Order).find();
    }

    public async findById(orderId: string): Promise<OrderDto> {
        let order = await this.findById_(orderId);
        return order.toDto();
    }

    private async findById_(orderId: string): Promise<Order> {
        try {
            let order = await getRepository(Order).findOne(orderId);
            return order;
        } catch (errors) {
            throw new HttpException('Order with given id does not exist.', 400);
        }
    }

    public async createOrder(orderDto: OrderDto): Promise<OrderDto> {
        let customer: any;
        try {
            customer = await this.customerService.findById(orderDto.customerId);
        } catch (errors) {
            throw new HttpException('User with id does not exist.', 400);
        }

        let order: Order = await this.dtoToModel(orderDto);
        let orderResult = await getRepository(Order).save(order);
        return orderResult.toDto();
    }

    public async findOrdersOfCustomerId(custId: string): Promise<OrderDto[]> {

        let repoResult = await this._findOrdersOfCustomerId(custId);

        let result: OrderDto[] = [];
        repoResult.forEach(async element => {
            result.push(await element.toDto())
        });

        return result;
    }

    public async cancelOrderById(orderId: string): Promise<OrderDto> {
        let order = await getRepository(Order).findOne(orderId).then(async order=>{
            order.cancel();
            return getRepository(Order).save(order);
        });
        return order.toDto();
    }

    private async _findOrdersOfCustomerId(custId: string): Promise<Order[]> {
        let orderRepository = getMongoRepository(Order);
        let repoResult = await orderRepository.find({
            where: {
                customerId: { $eq: custId },
            }
        });
        if (repoResult == null || repoResult.length == 0) {
            throw new HttpException('No orders found to the given id', 400);
        }
        return repoResult;
    }

    public async dtoToModel(orderDto: OrderDto): Promise<Order> {
        return new Order(
            orderDto._id,
            orderDto.customerId,
            await this.productsToModel(orderDto.products),
            orderDto.deliveryDate,
            await this.getOrderEnumStatus(orderDto.status)
        )
    }

    private async getOrderEnumStatus(desc: string): Promise<OrderStates> {
        let result: OrderStates;
        Object.values(OrderStates).forEach(async e => {
            if (e.toString() == desc) {
                result = e;
            }
        })
        return result;
    }

    protected async productDtoToModel(productDto: ProductDto): Promise<Product> {
        return new Product(
            productDto.id,
            productDto.productId,
            productDto.quantity
        )
    }

    protected async productsToModel(productsDto: ProductDto[]): Promise<Product[]> {
        let products: Product[] = [];
        productsDto.forEach(async element => {
            products.push(await this.productDtoToModel(element));
        });
        return products;
    }
}
