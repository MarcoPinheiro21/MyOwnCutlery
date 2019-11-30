import { Column } from "typeorm";
import { Address } from "./address";
import { CustomerDetailsDto } from "src/dto/customer.details.dto";

export class CustomerDetails {

    @Column()
    private id: string;
    @Column()
    private name: string;
    @Column()
    private vatNumber: string;
    @Column(type => Address)
    private deliveryAddress: Address;

    constructor(id: string, name: string, vatNumber: string, deliveryAddress: Address) {
        this.id = id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.deliveryAddress = deliveryAddress;
    }

    public async toDto(): Promise<CustomerDetailsDto> {
        return <CustomerDetailsDto>{
            id: this.id,
            name: this.name,
            vatNumber: this.vatNumber,
            deliveryAddress: await this.deliveryAddress.toDto()
        };
    }
}