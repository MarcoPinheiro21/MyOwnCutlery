import { Entity, ObjectIdColumn, Column } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";
import { OrderDto } from "src/dto/order.dto";
import { ProductDto } from "src/dto/product.dto";
import { OrderStates } from "src/enums/orderStates.enum";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";

@Entity()
export class Order {

    @ObjectIdColumn()
    private _id: string;
    @Column()
    private customerId: string;
    @Column(type => Product)
    private products: Product[];
    @Column()
    private deliveryDate: string;
    @Column()
    private status: OrderStates;

    constructor(id: string, customerId: string, products: Product[], deliveryDate?: string, status?: OrderStates) {
        this._id = id;
        this.customerId = customerId;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.status = status != null ? status : OrderStates.INPROGRESS;
    }

    public async toDto(): Promise<OrderDto> {
        return <OrderDto>{
            _id: this._id,
            customerId: this.customerId,
            products: await this.productsToDto(),
            deliveryDate: this.deliveryDate,
            status: this.status != null ? this.status.toString() : null
        };
    }

    public async setState(status: OrderStates): Promise<Order> {
        if (this.status == OrderStates.COMPLETED) {
            throw new OrdersApiDomainException('The order has already been completed.', 400);
        }
        if (this.status == OrderStates.CANCELLED) {
            throw new OrdersApiDomainException('The order has already been cancelled.', 400);
        }
        this.status = status;
        return this;
    }

    public async getState(): Promise<OrderStates> {
        return this.status;
    }

    public getId(): string {
        return this._id;
    }

    private async productsToDto(): Promise<ProductDto[]> {
        let productsDto: ProductDto[] = [];
        this.products.forEach(async element => {
            productsDto.push(await element.toDto());
        });
        return productsDto;
    }

}
