import { Address } from "./address.domain";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";
import { CustomerDetails } from "./customer-details.domain";
import { ICustomer } from "./iCustomer.domain";

export class Customer implements ICustomer {

    private _id: string;
    private name: string;
    private vatNumber: string;
    private address: Address;
    private phoneNumber: string;
    private email: string;
    private priority: number;
    private userId: string;

    constructor(_id: string, name: string, vatNumber: string,
        address: Address, phoneNumber: string, email: string, priority: number, userId?: string) {
        this._id = _id;
        this.name = name;
        this.vatNumber = vatNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.priority = priority;
        this.userId = userId;
    }

    public getId(): string {
        return this._id == undefined ? null : this._id.toString();
    }

    public getName(): string {
        return this.name;
    }

    public getVatNumber(): string {
        return this.vatNumber;
    }

    public getAddress(): Address {
        return this.address;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPriority(): number {
        return this.priority;
    }

    public getUserId(): string {
        return this.userId;
    }

    async updateDeliveryAddress(street?: string, postalCode?: string, town?: string, country?: string) {
        if (street != null) {
            this.address.setStreet(street);
        }
        if (postalCode != null) {
            this.address.setPostalCode(postalCode);
        }
        if (town != null) {
            this.address.setTown(town);
        }
        if (country != null) {
            this.address.setCountry(country);
        }
    }

    public forgetData(): Customer {
        this.name = 'XXXXXXXX';
        this.vatNumber = 'XXXXXXXXX';
        this.address = new Address('XXXXXXXX', 'XXXX-XXX', 'XXXXXXXXXX','XXXXXXXXXXXX');
        this.phoneNumber = 'XXXXXXXXX';
        this.email = 'XXXX@XXXX.XXX'
        return this;
    }

    public setName(name: string) {
        if (name == null || name.trim().length == 0) {
            throw new OrdersApiDomainException('Customer\'s name cannot be empty ');
        }
        this.name = name;
    }

    public setVatNumber(vatNumber: string) {
        if (vatNumber == null || vatNumber.trim().length == 0 || !vatNumber.match(/[0-9]{9}/)) {
            throw new OrdersApiDomainException('Customer\'s vat number is invalid');
        }
        this.vatNumber = vatNumber;
    }

    public setPhoneNumber(phoneNumber: string) {
        if (phoneNumber == null || phoneNumber.trim().length == 0 || !phoneNumber.match(/[0-9]{9}/)) {
            throw new OrdersApiDomainException('Customer\'s phone number is invalid');
        }
        this.phoneNumber = phoneNumber;
    }

    public setEmail(email: string) {
        if (email == null || email.trim().length == 0 ||
            !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            throw new OrdersApiDomainException('Customer\'s email is invalid');
        }
        this.email = email;
    }

    public setPriority(priority: number) {
        if (priority == null || (priority <= 0 && priority > 5)) {
            throw new OrdersApiDomainException('Customer\'s priority range must be between 1 - 5');
        }
        this.priority = priority;
    }

    public async setAddress(street?: string, postalCode?: string, town?: string, country?: string) {

        if (street != null) {
            await this.address.setStreet(street);
        }
        if (postalCode != null) {
            await this.address.setPostalCode(postalCode);
        }
        if (town != null) {
            await this.address.setTown(town);
        }
        if (country != null) {
            await this.address.setCountry(country);
        }
    }

    public setUserId(userId: string) {
        if (userId == null) {
            throw new OrdersApiDomainException('Customer\'s user ID is invalid');
        }
        this.userId = userId;
    }

    public async getDetails(): Promise<CustomerDetails> {
        return new CustomerDetails(
            this._id.toString(),
            this.name,
            this.vatNumber,
            this.address
        )
    }



}
