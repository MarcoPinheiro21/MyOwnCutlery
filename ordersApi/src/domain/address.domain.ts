import { OrdersApiDomainException } from "src/exceptions/domain.exception";

export class Address {

    private street: string;
    private postalCode: string;
    private town: string;
    private country: string;

    constructor(street: string, postalCode: string, town: string, country: string) {
        this.street = street;
        this.postalCode = postalCode;
        this.town = town;
        this.country = country;
    }

    public getStreet() : string{
        return this.street;
    }

    public getPostalCode() : string{
        return this.postalCode;
    }

    public getTown() : string{
        return this.town;
    }

    public getCountry() : string{
        return this.country;
    }
    

    async setStreet(street: string): Promise<any> {
        if (street == null || street.trim().length == 0) {
            throw new OrdersApiDomainException('Customer\'s address cannot be empty ');
        }
        this.street = street;
    }

    async setPostalCode(postalCode: string): Promise<any> {
        if (postalCode == null || postalCode.trim().length < 4) {
            throw new OrdersApiDomainException('Customer\'s postal code should have 4 characters at least');
        }
        this.postalCode = postalCode;
    }

    async setTown(town: string): Promise<any> {
        if (town == null || town.trim().length == 0) {
            throw new OrdersApiDomainException('Customer\'s address cannot be empty ');
        }
        this.town = town;
    }

    async setCountry(country: string): Promise<any> {
        if (country == null || country.trim().length == 0) {
            throw new OrdersApiDomainException('Customer\'s country cannot be empty ');
        }
        this.country = country;
    }


}
