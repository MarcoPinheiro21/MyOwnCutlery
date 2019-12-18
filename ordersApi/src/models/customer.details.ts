import { Column } from "typeorm";
import { AddressModel } from "./address";

export class CustomerDetailsModel {

    @Column()
    public id: string;
    @Column()
    public name: string;
    @Column()
    public vatNumber: string;
    @Column(type => AddressModel)
    public deliveryAddress: AddressModel;

    constructor(id: string, name: string, vatNumber: string, deliveryAddress: AddressModel) {
        this.id = id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.deliveryAddress = deliveryAddress;
    }

}