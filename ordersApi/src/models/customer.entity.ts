import { Address } from "./address";
import { Entity, Column, ObjectIdColumn, ObjectID, Index } from "typeorm";
import { CustomerDto } from "src/dto/customer.dto";
import { OrdersApiDomainException } from "src/exceptions/domain.exception";
import { CustomerDetails } from "./customer.details";

@Entity()
export class Customer {

    @ObjectIdColumn()
    private _id: ObjectID;
    @Column()
    private name: string;
    @Column()
    @Index({unique: true})
    private vatNumber: string;
    @Column(type => Address)
    private address: Address;
    @Column()
    private phoneNumber: string;
    @Column()
    @Index({unique: true})
    private email: string;
    @Column()
    private priority: number;
    @Column()
    @Index({unique: true})
    private userId: string;

    constructor(name: string, vatNumber: string,
        address: Address, phoneNumber: string, email: string, priority: number, userId?: string) {
        this.name = name;
        this.vatNumber = vatNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.priority = priority;
        this.userId = userId;
    }

    public forgetData(): Customer {
        this.name = 'XXXXXXXX';
        this.vatNumber = 'XXXXXXXXX';
        this.address = null;
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

    public async toDto(): Promise<CustomerDto> {
        return <CustomerDto>{
            _id: this._id.toString(),
            name: this.name,
            vatNumber: this.vatNumber,
            address: this.address != null ? await this.address.toDto() : null,
            phoneNumber: this.phoneNumber,
            email: this.email,
            priority: this.priority,
            userId: this.userId
        };
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
