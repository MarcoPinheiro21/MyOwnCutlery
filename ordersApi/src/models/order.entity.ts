import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";
import { OrderDto } from "src/dto/order.dto";
import { ProductDto } from "src/dto/product.dto";
import { OrderStates } from "src/enums/orderStates.enum";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";
import { HttpException } from "@nestjs/common";

@Entity()
export class Order {

    @ObjectIdColumn()
    private _id: ObjectID;
    @Column()
    private customerId: string;
    @Column(type => Product)
    private products: Product[];
    @Column()
    private deliveryDate: string;
    @Column()
    private status: OrderStates;

    constructor(customerId: string, products: Product[], deliveryDate?: string, status?: OrderStates) {
        this.customerId = customerId;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.status = status != null ? status : OrderStates.INPROGRESS;
    }

    public async toDto(): Promise<OrderDto> {
        return <OrderDto>{
            _id: this._id.toString(),
            customerId: this.customerId,
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
