import { OrdersApiDomainException } from "src/exceptions/domain.exception";

export class Product {

    private id: string;
    private name: string;
    private quantity: number;

    constructor(id: string, quantity: number, name?: string) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
    }

    public async equals(anotherProductId: string): Promise<boolean> {
        return this.id == anotherProductId;
    }

    async updateQuantity(quantity: number) {
        if (quantity < 1) {
            throw new OrdersApiDomainException('Invalid product quantity');
        }
        this.quantity = quantity;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getQuantity(): number {
        return this.quantity;
    }


}
