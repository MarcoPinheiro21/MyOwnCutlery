import { AddressModel } from "./address";
import { Entity, Column, ObjectIdColumn, ObjectID, Index } from "typeorm";

@Entity()
export class CustomerModel {

    @ObjectIdColumn()
    public _id: ObjectID;
    @Column()
    public name: string;
    @Column()
    @Index({ unique: true })
    public vatNumber: string;
    @Column(type => AddressModel)
    public address: AddressModel;
    @Column()
    public phoneNumber: string;
    @Column()
    @Index({ unique: true })
    public email: string;
    @Column()
    public priority: number;
    @Column()
    @Index({ unique: true })
    public userId: string;

    constructor(_id: ObjectID, name: string, vatNumber: string,
        address: AddressModel, phoneNumber: string, email: string, priority: number, userId?: string) {
        this._id = _id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.priority = priority;
        this.userId = userId;
    }
}
