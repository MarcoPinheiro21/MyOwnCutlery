import { Address } from "./address";
import { Entity, Column, ObjectIdColumn } from "typeorm";
import { CustomerDto } from "src/dto/customer.dto";

@Entity()
export class Customer {

    @ObjectIdColumn()
    private id: string;
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

    constructor(id: string, name: string, vatNumber: string,
        address: Address, phoneNumber: string, email: string, priority: number) {
        this.id = id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.priority = priority;
    }

    public async toDto(): Promise<CustomerDto> {
        return <CustomerDto>{
            id: this.id,
            name: this.name,
            vatNumber: this.vatNumber,
            address: this.address != null ? await this.address.toDto() : null,
            phoneNumber: this.phoneNumber,
            email: this.email,
            priority: this.priority
        };
    }
}
