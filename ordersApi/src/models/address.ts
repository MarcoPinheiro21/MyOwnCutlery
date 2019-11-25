import { Column } from "typeorm";
import {AddressDto} from "src/dto/address.dto";

export class Address {

    @Column()
    private street: string;
    @Column()
    private postalCode: string;
    @Column()
    private town: string;

    constructor(street: string, postalCode: string, town: string) {
        this.street = street;
        this.postalCode = postalCode;
        this.town = town;
    }

    public async getStreet() {
        return this.street;
    }

    public async getPostalCode() {
        return this.postalCode;
    }

    public async getTown() {
        return this.town;
    }

    public async setStreet(street: string) {
        this.street = street;
    }

    public async setPostalCode(postalCode: string) {
        this.street = postalCode;
    }

    public async setTown(town: string) {
        this.street = town;
    }

    public async toDto(): Promise<AddressDto> {
        return <AddressDto>{
            street: this.street,
            postalCode: this.postalCode,
            town: this.town
        };
    }
}
