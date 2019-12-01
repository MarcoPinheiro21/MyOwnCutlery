import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { Product } from "./product.entity";
import { ProductDto } from "src/dto/product.dto";
import { OrderStates } from "src/enums/orderStates.enum";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";
import { CustomerDetails } from "./customer.details";
import { ReadOrderDto } from "src/dto/order.read.dto";
import { EditAddressDto } from "src/dto/address.edit.dto";

@Entity()
export class Order {

    @ObjectIdColumn()
    private _id: ObjectID;
    @Column(type => CustomerDetails)
    private customerDetails: CustomerDetails;
    @Column(type => Product)
    private products: Product[];
    @Column()
    private deliveryDate: string;
    @Column()
    private status: OrderStates;

    constructor(customerDetails: CustomerDetails, products: Product[], deliveryDate?: string, status?: OrderStates) {
        this.customerDetails = customerDetails;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.status = status != null ? status : OrderStates.INPROGRESS;
    }

    async toDto(): Promise<ReadOrderDto> {
        return <ReadOrderDto>{
            _id: this._id.toString(),
            customerDetails: await this.customerDetails.toDto(),
            products: await this.productsToDto(),
            deliveryDate: this.deliveryDate,
            status: this.status != null ? this.status.toString() : null
        };
    }

    async addProduct(id: string, quantity: number, name: string): Promise<Order> {
        this.products.push(new Product(id, quantity, name));
        return this;
    }

    async updateDeliveryDate(date: string): Promise<void> {
        if (!date.match(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/)) {
            throw new OrdersApiDomainException('Delivery date is invalid.');
        }
        this.deliveryDate = date;
    }

    async hasProduct(id: string): Promise<boolean> {
        let hasProduct: boolean = false;
        for (let product of this.products) {
            if (await product.equals(id)) {
                hasProduct = true;
                break;
            }
        }
        return hasProduct;
    }

    async updateProduct(id: string, quantity: number): Promise<Order> {
        this.products.forEach(element => {
            if (element.equals(id)) {
                element.updateQuantity(quantity);
            }
        });
        return this;
    }

    async deleteProduct(id: string): Promise<Order> {
        this.products.forEach(element => {
            if (element.equals(id)) {
                let i = this.products.indexOf(element);
                this.products.splice(i);
            }
        });
        return this;
    }

    async updateDeliveryAddress(street?: string, postalCode?: string, town?: string, country?: string): Promise<Order> {
        this.customerDetails.updateDeliveryAddress(street, postalCode, town, country)
        return this;
    }

    async cancel(): Promise<Order> {
        if (this.status == OrderStates.COMPLETED) {
            throw new OrdersApiDomainException('The order has already been completed.');
        }
        if (this.status == OrderStates.CANCELLED) {
            throw new OrdersApiDomainException('The order has already been cancelled.');
        }
        this.status = OrderStates.CANCELLED;
        return this;
    }

    public getState(): OrderStates {
        return this.status;
    }

    public getId(): string {
        return this._id.toString();
    }

    private async productsToDto(): Promise<ProductDto[]> {
        let productsDto: ProductDto[] = [];
        this.products.forEach(async element => {
            productsDto.push(await element.toDto());
        });
        return productsDto;
    }

}
