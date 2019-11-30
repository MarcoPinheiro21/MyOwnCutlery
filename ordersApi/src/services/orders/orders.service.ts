import { Injectable, HttpException, Inject } from '@nestjs/common';
import { OrderDto } from '../../dto/order.dto';
import { Order } from 'src/models/order.entity';
import { Product } from 'src/models/product.entity';
import { ProductDto } from '../../dto/product.dto';
import { getRepository, getMongoRepository, ObjectID } from 'typeorm';
import { IOrdersService } from './iOrders.service';
import { OrderStates } from 'src/enums/orderStates.enum';
import { ReadOrderDto } from 'src/dto/order.read.dto';
import { CustomerDetails } from 'src/models/customer.details';
import { CustomersService } from '../customers/customers.service';
import { OrdersApiDomainException } from 'src/exceptions/domain.exception';


@Injectable()
export class OrdersService implements IOrdersService {

    constructor(private readonly customerService: CustomersService) {
    }

    public async findAll(includeCancelled: string): Promise<ReadOrderDto[]> {

        let ordersDto: ReadOrderDto[] = [];
        let orders = await this.findAll_();
        let ordersFiltered: Order[];

        ordersFiltered = (includeCancelled == 'true') ?
            orders :
            orders.filter(e =>
                (e.getState()) !== OrderStates.CANCELLED)

        ordersFiltered.forEach(async element =>
            ordersDto.push(await element.toDto())
        );
        return ordersDto;
    }

    async findAll_(): Promise<Order[]> {
        return await getRepository(Order).find();
    }

    public async findById(orderId: string): Promise<ReadOrderDto> {
        let order = await this.findById_(orderId);
        return await order.toDto();
    }

    private async findById_(orderId: string): Promise<Order> {
        try {
            let order = await getRepository(Order).findOne(orderId);
            return order;
        } catch (errors) {
            throw new OrdersApiDomainException('Order with given id does not exist.');
        }
    }

    public async createOrder(orderDto: OrderDto): Promise<ReadOrderDto> {
        try {
            let customer = await this.customerService.findById(orderDto.customerId);
        } catch (errors) {
            throw new HttpException('User with id does not exist.', 400);
        }

        let order: Order = await this.dtoToModel(orderDto);
        let orderResult = await getRepository(Order).save(order);
        return orderResult.toDto();
    }

    public async findOrdersOfCustomerId(custId: string): Promise<ReadOrderDto[]> {

        let repoResult = await this._findOrdersOfCustomerId(custId);

        let result: ReadOrderDto[] = [];
        repoResult.forEach(async element => {
            result.push(await element.toDto())
        });

        return result;
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

    public async cancelOrderById(orderId: string): Promise<ReadOrderDto> {
        let order = await this.findById_(orderId);
        let resultOrder = await getRepository(Order).save(order.cancel());
        return resultOrder.toDto();
    }

    public async dtoToModel(orderDto: OrderDto): Promise<Order> {
        return new Order(
            await this.fillCustomerDetails(orderDto),
            await this.productsToModel(orderDto.products),
            orderDto.deliveryDate,
            await this.getOrderEnumStatus(orderDto.status)
        )
    }

    private async fillCustomerDetails(orderDto: OrderDto) : Promise<CustomerDetails>{
        let customer = await this.customerService.findById_(orderDto.customerId);
        return await customer.getDetails();
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
