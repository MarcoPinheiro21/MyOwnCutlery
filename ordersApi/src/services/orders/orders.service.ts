import { Injectable } from '@nestjs/common';
import { OrderDto } from '../../dto/order.dto';
import { Order } from 'src/models/order.entity';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/models/product.entity';
import { ProductDto } from '../../dto/product.dto';
import { getRepository } from 'typeorm';
import { CustomerDto } from 'src/dto/customer.dto';


@Injectable()
export class OrdersService {

    constructor(private readonly customerService: CustomersService,
        private readonly productsService: ProductsService) {
    }

    public async getAll() {
        return await getRepository(Order).find();
    }

    public async saveOrder(orderDto: OrderDto): Promise<OrderDto> {
        let order: Order = await this.dtoToModel(orderDto);
        let orderResult = await getRepository(Order).save(order);
        return orderResult.toDto();
    }

    public async dtoToModel(orderDto: OrderDto): Promise<Order> {
        return new Order(
            orderDto.id,
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
