import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { Product } from "./product.entity";
import { ProductDto } from "src/dto/product.dto";
import { OrderStates } from "src/enums/orderStates.enum";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";
import { CustomerDetails } from "./customer.details";
import { ReadOrderDto } from "src/dto/order.read.dto";
import { CustomerDetailsDto } from "src/dto/customer.details.dto";

@Entity()
export class Order {

    @ObjectIdColumn()
    private _id: ObjectID;
    @Column(type=>CustomerDetails)
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

    public async toDto(): Promise<ReadOrderDto> {
        return <ReadOrderDto>{
            _id: this._id.toString(),
            customerDetails: await this.customerDetails.toDto(),
            products: await this.productsToDto(),
            deliveryDate: this.deliveryDate,
            status: this.status != null ? this.status.toString() : null
        };
    }

    public cancel(): Order {
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
