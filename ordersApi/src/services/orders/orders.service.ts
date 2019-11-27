import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { OrderDto } from '../../dto/order.dto';
import { Order } from 'src/models/order.entity';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/models/product.entity';
import { ProductDto } from '../../dto/product.dto';
import { getRepository, getMongoManager, getMongoRepository } from 'typeorm';
import { CustomerDto } from 'src/dto/customer.dto';


@Injectable()
export class OrdersService {

    constructor(private readonly customerService: CustomersService,
        private readonly productsService: ProductsService) {
    }

    public async findAll() {
        return await getRepository(Order).find();
    }

    public async createOrder(orderDto: OrderDto): Promise<OrderDto> {
        let customer;
        try{
            customer = await this.customerService.findById(orderDto.customerId);
        } catch(errors){
            throw new HttpException('User with id does not exist.',400);
        }
        
        let order: Order = await this.dtoToModel(orderDto);
        let orderResult = await getRepository(Order).save(order);
        return orderResult.toDto();
    }

    public async findOrdersOfCustomerId(custId: string): Promise<OrderDto[]> {
        let orderRepository = getMongoRepository(Order);
        let repoResult = await orderRepository.find({
            where: {
                customerId: { $eq: custId },
            }
        });

        let result: OrderDto[] = [];
        repoResult.forEach(async element => {
            result.push(await element.toDto())
        });

        return result;
    }

    public async dtoToModel(orderDto: OrderDto): Promise<Order> {
        return new Order(
            orderDto._id,
            orderDto.customerId,
            await this.productsToModel(orderDto.products),
            orderDto.deliveryDate
        )
    }

    private async productsToModel(productsDto: ProductDto[]): Promise<Product[]> {
        let products: Product[] = [];
        productsDto.forEach(async element => {
            products.push(await this.productsService.dtoToModel(element));
        });
        return products;
    }

}
