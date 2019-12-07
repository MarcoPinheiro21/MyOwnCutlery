import { Column } from "typeorm";

export class AddressModel {

    @Column()
    public street: string;
    @Column()
    public postalCode: string;
    @Column()
    public town: string;
    @Column()
    public country: string;

    constructor(street: string, postalCode: string, town: string, country: string) {
        this.street = street;
        this.postalCode = postalCode;
        this.town = town;
        this.country = country;
    }
}
