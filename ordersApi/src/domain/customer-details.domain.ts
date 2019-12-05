import { Address } from "./address.domain";

export class CustomerDetails {

    private id: string;
    private name: string;
    private vatNumber: string;
    private deliveryAddress: Address;

    constructor(id: string, name: string, vatNumber: string, deliveryAddress: Address) {
        this.id = id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.deliveryAddress = deliveryAddress;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getVatNumber(): string {
        return this.vatNumber;
    }

    public getDeliveryAddress(): Address {
        return this.deliveryAddress;
    }

    async updateDeliveryAddress(street?: string, postalCode?: string, town?: string, country?: string) {
        if (street != null) {
            this.deliveryAddress.setStreet(street);
        }
        if (postalCode != null) {
            this.deliveryAddress.setPostalCode(postalCode);
        }
        if (town != null) {
            this.deliveryAddress.setTown(town);
        }
        if (country != null) {
            this.deliveryAddress.setCountry(country);
        }
    }

}
