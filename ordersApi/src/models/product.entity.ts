import { Entity, ObjectIdColumn, Column } from "typeorm";
import {ProductDto} from "src/dto/product.dto";

@Entity()
export class Product {

    @ObjectIdColumn()
    private id: string;
    @Column()
    private productId: string;
    @Column()
    private quantity: number;

    constructor(id: string, productId: string, quantity: number) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }

    public async toDto(): Promise<ProductDto> {
        return <ProductDto>{
            id: this.id,
            productId: this.productId,
            quantity: this.quantity
        }
    }
}
