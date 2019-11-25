import { Entity, ObjectIdColumn, Column } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";
import { OrderDto } from "src/dto/order.dto";
import { ProductDto } from "src/dto/product.dto";

@Entity()
export class Order {

    @ObjectIdColumn()
    private id: string;
    @Column()
    private customerId: string;
    @Column(type => Product)
    private products: Product[];
    @Column()
    private deliveryDate: number;

    constructor(id: string, customerId: string, products: Product[], deliveryDate: number) {
        this.id = id;
        this.customerId = customerId;
        this.products = products;
        this.deliveryDate = deliveryDate;
    }

    public async toDto(): Promise<OrderDto> {
        return <OrderDto>{
            id: this.id,
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
