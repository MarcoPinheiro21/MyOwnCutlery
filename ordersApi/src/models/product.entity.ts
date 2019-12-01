import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { ProductDto } from "src/dto/product.dto";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";

export class Product {

    @Column()
    private id: string;
    @Column()
    private name: string;
    @Column()
    private quantity: number;


    constructor(id: string, quantity: number, name?: string) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
    }

    public async equals(anotherProductId: string): Promise<boolean> {
        return this.id === anotherProductId;
    }

    async updateQuantity(quantity: number) {
        if (quantity < 1) {
            throw new OrdersApiDomainException('Invalid product quantity');
        }
        this.quantity = quantity;
    }

    public async toDto(): Promise<ProductDto> {
        return <ProductDto>{
            id: this.id,
            name: this.name,
            quantity: this.quantity
        }
    }
}
