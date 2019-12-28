import { IOrderDomain } from "../domain/iOrder.domain";
import { OrderModel } from "../models/order.entity";
import { ObjectID } from "mongodb";
import { CustomerDetailsModel } from "../models/customer.details";
import { AddressModel } from "../models/address";
import { CustomerDetails } from "../domain/customer-details.domain";
import { Address } from "../domain/address.domain";
import { ProductModel } from "../models/product.entity";
import { Product } from "../domain/product.domain";
import { Order } from "../domain/order.domain";
import { CustomerModel } from "../models/customer.entity";
import { ICustomer } from "../domain/iCustomer.domain";
import { Customer } from "../domain/customer.domain";
import { OrderInfoModel } from "../models/orderInfo.entity";
import { OrderInfo } from "../domain/orderInfo.domain";

export class ModelMapper {

    public static async createOrderModel(order: IOrderDomain): Promise<OrderModel> {
        let objectId: ObjectID = order.getId() == undefined ? null : new ObjectID(order.getId());
        return new OrderModel(
            objectId,
            await this.customerDetailsToModel(order.getCustomerDetails()),
            await this.productsToModel(order.getProducts()),
            order.getDeliveryDate(),
            order.getExpectedDeliveryDate() == undefined ? null : order.getExpectedDeliveryDate(),
            order.getStatus());
    }

    public static async createOrderDomain(order: OrderModel): Promise<Order> {
        return new Order(
            order._id == null ? null : order._id.toString(),
            await this.customerDetaisToDomain(order.customerDetails),
            await this.productsToDomain(order.products),
            order.deliveryDate,
            order.expectedDeliveryDate == undefined ? null : order.expectedDeliveryDate,
            order.status);
    }

    public static async createOrderInfoDomain(order: OrderInfoModel): Promise<OrderInfo> {
        return new OrderInfo(
            order.productId,
            order.sumQuantity,
            order.totalOrders,
            order._id.toString());
    }

    public static async createOrderInfoModel(orderInfo: OrderInfo): Promise<OrderInfoModel> {
        return new OrderInfoModel(
            orderInfo.getProductId(),
            orderInfo.getSumQuantity(),
            orderInfo.getTotalOrders(),
            new ObjectID(orderInfo.getId()));
    }

    public static async createCustomerModel(customer: ICustomer): Promise<CustomerModel> {
        let objectId: ObjectID = customer.getId() == undefined ? null : new ObjectID(customer.getId());
        return new CustomerModel(
            objectId,
            customer.getName(),
            customer.getVatNumber(),
            await this.addressToModel(customer.getAddress()),
            customer.getPhoneNumber(),
            customer.getEmail(),
            customer.getPriority(),
            customer.getUserId())
    }

    public static async createCustomerDomain(customerModel: CustomerModel): Promise<Customer> {
        return new Customer(
            customerModel._id == null ? null : customerModel._id.toString(),
            customerModel.name,
            customerModel.vatNumber,
            await this.addressToDomain(customerModel.address),
            customerModel.phoneNumber,
            customerModel.email,
            customerModel.priority,
            customerModel.userId
        )
    }

    private static async customerDetailsToModel(customerDetails: CustomerDetails): Promise<CustomerDetailsModel> {
        return new CustomerDetailsModel(
            customerDetails.getId(),
            customerDetails.getName(),
            customerDetails.getVatNumber(),
            await this.addressToModel(customerDetails.getDeliveryAddress()))
    }

    private static async addressToModel(address: Address): Promise<AddressModel> {
        return new AddressModel(address.getStreet(),
            address.getPostalCode(),
            address.getTown(),
            address.getCountry())
    }

    private static async productsToModel(products: Product[]): Promise<ProductModel[]> {
        let productsModel: ProductModel[] = [];
        for (let p of products) {
            productsModel.push(new ProductModel(p.getId(), await p.getQuantity(), p.getName()))
        }
        return productsModel;
    }

    private static async customerDetaisToDomain(customerDetails: CustomerDetailsModel): Promise<CustomerDetails> {
        return new CustomerDetails(
            customerDetails.id,
            customerDetails.name,
            customerDetails.vatNumber,
            await this.addressToDomain(customerDetails.deliveryAddress));
    }

    private static async productsToDomain(products: ProductModel[]): Promise<Product[]> {
        let prods: Product[] = [];
        for (let p of products) {
            prods.push(new Product(p.id, p.quantity, p.name));
        }
        return prods;
    }

    private static async addressToDomain(address: AddressModel): Promise<Address> {
        return new Address(
            address.street,
            address.postalCode,
            address.town,
            address.country)
    }
}