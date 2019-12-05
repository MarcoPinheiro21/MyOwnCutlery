import { Injectable, HttpException, Inject, HttpService } from '@nestjs/common';
import { OrderDto } from '../../dto/order.dto';
import { ProductDto } from '../../dto/product.dto';
import { IOrdersService } from './iOrders.service';
import { OrderStates } from 'src/enums/orderStates.enum';
import { ReadOrderDto } from 'src/dto/order.read.dto';
import { CustomersService } from '../customers/customers.service';
import { OrdersApiDomainException } from 'src/exceptions/domain.exception';
import { EditOrderDto } from 'src/dto/order.edit.dto';
import settings from "../../../config.json";
import { ProductApiDto } from 'src/dto/product.api.dto';
import { IOrdersRepository } from 'src/repository/iOrders.repository';
import { EditProductDto } from 'src/dto/product.dto.edit';
import { Order } from 'src/domain/order.domain';
import { CustomerDetails } from 'src/domain/customer-details.domain';
import { DomainMapper } from '../mapper/domain.mapper';
import { Product } from 'src/domain/product.domain';

@Injectable()
export class OrdersService implements IOrdersService {

    constructor(
        private readonly customerService: CustomersService,
        private readonly httpService: HttpService,
        @Inject('IOrdersRepository') private readonly ordersRepository: IOrdersRepository) {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
    }
    /**
     * Implemented interface methods 
     */

    public async findAll(includeCancelled: string): Promise<ReadOrderDto[]> {

        let ordersDto: ReadOrderDto[] = [];
        let orders = await this.findAll_();
        let ordersFiltered: Order[];

        ordersFiltered = (includeCancelled == 'true') ?
            orders :
            orders.filter(e =>
                (e.getStatus()) !== OrderStates.CANCELLED)

        ordersFiltered.forEach(async element =>
            ordersDto.push(await DomainMapper.orderToDto(element))
        );
        return ordersDto;
    }

    public async findById(orderId: string): Promise<ReadOrderDto> {
        let order = await this.findById_(orderId);
        return await DomainMapper.orderToDto(order);
    }

    public async createOrder(orderDto: OrderDto): Promise<ReadOrderDto> {
        let customer = await this.customerService.findById(orderDto.customerId);
        let products : ProductDto[] = await this.fillProductsAvailability(orderDto.products);
        let order: Order = await DomainMapper.orderToDomain(orderDto, customer, products);
        let orderResult = await this.ordersRepository.saveOrder(order);
        return DomainMapper.orderToDto(orderResult);
    }

    public async findOrdersOfCustomerId(custId: string): Promise<ReadOrderDto[]> {

        let repoResult = await this.findOrdersOfCustomerId_(custId);

        let result: ReadOrderDto[] = [];
        repoResult.forEach(async element => {
            result.push(await DomainMapper.orderToDto(element))
        });

        return result;
    }

    public async cancelOrderById(orderId: string): Promise<ReadOrderDto> {
        let order = await this.findById_(orderId);
        let resultOrder = await this.ordersRepository.saveOrder(await order.cancel());
        return DomainMapper.orderToDto(resultOrder);
    }

    public async updateOrder(id: string, orderDto: EditOrderDto): Promise<ReadOrderDto> {
        let order = await this.findById_(id);

        if (order.getStatus() != OrderStates.INPROGRESS) {
            throw new OrdersApiDomainException('The order state does not allow edition');
        }

        if (orderDto.deliveryAddress != null) {
            let address = orderDto.deliveryAddress;
            await order.updateDeliveryAddress(address.street,
                address.postalCode,
                address.town,
                address.country);
        }

        if (orderDto.deliveryDate != null && orderDto.deliveryDate.length > 0) {
            await order.updateDeliveryDate(orderDto.deliveryDate);
        }

        if (orderDto.products.length > 0) {
            this.validateProducts(orderDto.products)
            for (let element of orderDto.products) {
                let hasProduct: boolean = await order.hasProduct(element.id);

                if (element.toDelete == 'true') {
                    order = await order.deleteProduct(element.id);
                } else if (hasProduct) {
                    order = await order.updateProduct(element.id, element.quantity);
                } else {
                    let prod: ProductApiDto = await this.checkProductAvailability(element.id);
                    order = await order.addProduct(element.id, element.quantity, prod.productName);
                }
            }
        }

        let orederResult = await this.ordersRepository.saveOrder(order);
        return DomainMapper.orderToDto(orederResult);
    }

    private async findAll_(): Promise<Order[]> {
        return await this.ordersRepository.findAllOrders();
    }

    private async findById_(orderId: string): Promise<Order> {
        try {
            let order = await this.ordersRepository.findOrderById(orderId);
            if (order == null) {
                throw new OrdersApiDomainException('Order with given id does not exist.');
            }
            return order;
        } catch (errors) {
            throw new OrdersApiDomainException('Order with given id does not exist.');
        }
    }

    private async findOrdersOfCustomerId_(custId: string): Promise<Order[]> {
        let orders = await this.ordersRepository.findOrdersByCustomerId(custId);
        if (orders == null || orders.length == 0) {
            throw new HttpException('No orders found to the given id', 400);
        }
        return orders;
    }

    private validateProducts(productDto: EditProductDto[]): void {
        productDto.forEach(element => {
            if (element.toDelete != 'true' && (element.quantity == null || element.quantity < 1)) {
                throw new OrdersApiDomainException('At least one of products quantity is invalid')
            }
            if (element.id == null || element.id.length == 0) {
                throw new OrdersApiDomainException('At least one of products id is invalid')
            }
        });
    }

    private async fillCustomerDetails(orderDto: OrderDto): Promise<CustomerDetails> {
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

    private async fillProductsAvailability(productsDto: ProductDto[]): Promise<ProductDto[]> {
        for (let element of productsDto) {
            let productApi = await this.checkProductAvailability(element.id);
            element.name = productApi.productName;
        }
        return productsDto;
    }

    private async checkProductAvailability(id: string): Promise<ProductApiDto> {
        let response = null;
        try {
            response = await this.httpService.get(settings.url + id).toPromise();
        } catch (error) {
            if (error.code == 'ECONNREFUSED') {
                throw new OrdersApiDomainException('Could not connect to to Products Service', 503);
            }
            if (error.response.status == '404') {
                throw new OrdersApiDomainException('Product with id: ' + id + ' is not available.');
            }

        }
        return response.data;
    }
}