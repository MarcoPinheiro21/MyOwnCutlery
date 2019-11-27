import { Address } from "./address";
import { Entity, Column, ObjectIdColumn } from "typeorm";
import { CustomerDto } from "src/dto/customer.dto";

@Entity()
export class Customer {

    @ObjectIdColumn()
    private _id: string;
    @Column()
    private name: string;
    @Column()
    private vatNumber: string;
    @Column(type => Address)
    private address: Address;
    @Column()
    private phoneNumber: string;
    @Column()
    private email: string;
    @Column()
    private priority: number;
    @Column()
    private userId: string;

    constructor(id: string, name: string, vatNumber: string,
        address: Address, phoneNumber: string, email: string, priority: number, userId?: string) {
        this._id = id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.priority = priority;
        this.userId = userId;
    }

    public forgetData(): Customer {
        this.name = '';
        this.vatNumber = '';
        this.address = null;
        this.phoneNumber = '';
        this.email = ''
        return this;
    }

    public async toDto(): Promise<CustomerDto> {
        return <CustomerDto>{
            _id: this._id,
            name: this.name,
            vatNumber: this.vatNumber,
            address: this.address != null ? await this.address.toDto() : null,
            phoneNumber: this.phoneNumber,
            email: this.email,
            priority: this.priority,
            userId: this.userId
        };
    }
}
