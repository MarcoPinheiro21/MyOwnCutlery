import { Entity, ObjectIdColumn, Column } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";
import { OrderDto } from "src/dto/order.dto";
import { ProductDto } from "src/dto/product.dto";

@Entity()
export class Order {

    @ObjectIdColumn()
    private _id: string;
    @Column()
    private customerId: string;
    @Column(type => Product)
    private products: Product[];
    @Column()
    private deliveryDate: number;

    constructor(id: string, customerId: string, products: Product[], deliveryDate: number) {
        this._id = id;
        this.customerId = customerId;
        this.products = products;
        this.deliveryDate = deliveryDate;
    }

    public async toDto(): Promise<OrderDto> {
        return <OrderDto>{
            _id: this._id,
            customerId: this.customerId,
            products: await this.productsToDto(),
            deliveryDate: this.deliveryDate
        };
    }

    private async productsToDto(): Promise<ProductDto[]> {
        let productsDto: ProductDto[] = [];
        this.products.forEach(async element => {
            productsDto.push(await element.toDto());
        });
        return productsDto;
    }

}
