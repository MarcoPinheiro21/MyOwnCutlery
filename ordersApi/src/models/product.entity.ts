import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import {ProductDto} from "src/dto/product.dto";

export class Product {

    @Column()
    private id: string;
    @Column()
    private quantity: number;

    constructor(id: string, quantity: number) {
        this.id = id;
        this.quantity = quantity;
    }

    public async toDto(): Promise<ProductDto> {
        return <ProductDto>{
            id: this.id,
            quantity: this.quantity
        }
    }
}
