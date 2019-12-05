import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";

export class ProductModel {

    @Column()
    public id: string;
    @Column()
    public name: string;
    @Column()
    public quantity: number;

    constructor(id: string, quantity: number, name?: string) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
    }
}
