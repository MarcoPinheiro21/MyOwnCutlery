import { Order } from "../../domain/order.domain";
import { ReadOrderDto } from "../../dto/order.read.dto";
import { ProductDto } from "../../dto/product.dto";
import { Product } from "../../domain/product.domain";
import { CustomerDetails } from "../../domain/customer-details.domain";
import { CustomerDetailsDto } from "../../dto/customer.details.dto";
import { Address } from "../../domain/address.domain";
import { AddressDto } from "../../dto/address.dto";
import { OrderDto } from "../../dto/order.dto";
import { OrderStates } from "../../enums/orderStates.enum";
import { Customer } from "../../domain/customer.domain";
import { CustomerDto } from "../../dto/customer.dto";
import { OrderInfo } from "../../domain/orderInfo.domain";
import { OrderInfoDto } from "../../dto/orderInfo.read.dto";

export class DomainMapper {

    /**
     * Order to DTO
     */

    public static async orderToDto(order: Order): Promise<ReadOrderDto> {
        return <ReadOrderDto>{
            _id: order.getId(),
            customerDetails: await this.customerDetailsToDto(order.getCustomerDetails()),
            products: await this.productsToDto(order.getProducts()),
            deliveryDate: order.getDeliveryDate(),
            status: order.getStatus() != null ? order.getStatus().toString() : null
        };
    }

    public static async productsToDto(products: Product[]): Promise<ProductDto[]> {
        let productsDto: ProductDto[] = [];
        products.forEach(async element => {
            productsDto.push(await this.productToDto(element));
        });
        return productsDto;
    }

    public static async productToDto(product: Product): Promise<ProductDto> {
        return <ProductDto>{
            id: product.getId(),
            name: product.getName(),
            quantity: await product.getQuantity()
        }
    }

    public static async customerDetailsToDto(customerDetails: CustomerDetails): Promise<CustomerDetailsDto> {
        return <CustomerDetailsDto>{
            id: customerDetails.getId(),
            name: customerDetails.getName(),
            vatNumber: customerDetails.getVatNumber(),
            deliveryAddress: await this.addressToDto(customerDetails.getDeliveryAddress())
        };
    }

    /**
    * OrderDto to Domain
    */

    public static async orderToDomain(order: OrderDto, customerDto: CustomerDto, products: ProductDto[]): Promise<Order> {
        let address = await this.addressToDomain(customerDto.address);
        return new Order(
            order._id,
            new CustomerDetails(customerDto._id, customerDto.name, customerDto.vatNumber, address),
            await this.productsToDomain(products),
            order.deliveryDate,
            await this.getOrderEnumStatus(order.status)
        )
    }

    public static async productsToDomain(products: ProductDto[]): Promise<Product[]> {
        let result: Product[] = [];
        products.forEach(async element => {
            result.push(await this.productToDomain(element));
        });

        return result;
    }

    public static async productToDomain(product: ProductDto): Promise<Product> {
        return new Product(
            product.id,
            product.quantity,
            product.name
        )
    }

    public static async customerDetailsToDomain(customerDetails: CustomerDetailsDto): Promise<CustomerDetails> {
        return new CustomerDetails(
            customerDetails.id,
            customerDetails.name,
            customerDetails.vatNumber,
            await this.addressToDomain(customerDetails.deliveryAddress)
        )
    }

    public static async addressToDomain(address: AddressDto): Promise<Address> {
        return new Address(
            address.street,
            address.postalCode,
            address.town,
            address.country
        )
    }

    private static async getOrderEnumStatus(desc: string): Promise<OrderStates> {
        let result: OrderStates;
        Object.values(OrderStates).forEach(async e => {
            if (e.toString() == desc) {
                result = e;
            }
        })
        return result;
    }

    /**
    * Customer to Dto
    */

    public static async customerToDto(customer: Customer): Promise<CustomerDto> {
        return <CustomerDto>{
            _id: customer.getId(),
            name: customer.getName(),
            vatNumber: customer.getVatNumber(),
            address: customer.getAddress() != null ? await this.addressToDto(customer.getAddress()) : null,
            phoneNumber: customer.getPhoneNumber(),
            email: customer.getEmail(),
            priority: customer.getPriority(),
            userId: customer.getUserId()
        };
    }

    public static async addressToDto(address: Address): Promise<AddressDto> {
        return <AddressDto>{
            street: address.getStreet(),
            postalCode: address.getPostalCode(),
            town: address.getTown(),
            country: address.getCountry()
        }
    }


    /**
    * CustomerDto to Domain
    */

    public static async customerDtoToDomain(customerDto: CustomerDto): Promise<Customer> {
        let customer = new Customer(
            null,
            customerDto.name,
            customerDto.vatNumber,
            await this.toAddressDomain(customerDto.address),
            customerDto.phoneNumber,
            customerDto.email,
            customerDto.priority,
            customerDto.userId
        );
        return customer;
    }

    public static async toAddressDomain(addressDto: AddressDto): Promise<Address> {
        if (addressDto == null) return null;
        return new Address(
            addressDto.street,
            addressDto.postalCode,
            addressDto.town,
            addressDto.country
        )
    }

    /**
    * OrderInfo to Domain
    */
    public static async orderInfoDtoToDomain(orderInfo: OrderInfoDto): Promise<OrderInfo> {
        return new OrderInfo(
            orderInfo.productId,
            orderInfo.sumQuantity,
            orderInfo.totalOrders);
    }

    /**
    * OrderInfo to DTO
    */
    public static async orderInfoToDto(orderInfo: OrderInfo): Promise<OrderInfoDto> {
        return <OrderInfoDto>{
            productId: orderInfo.getProductId(),
            sumQuantity: orderInfo.getSumQuantity(),
            totalOrders: orderInfo.getTotalOrders()
        }
    }
}