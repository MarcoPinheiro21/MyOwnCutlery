import { Address } from "./address.domain";

export declare interface ICustomer {

    getId(): string;

    getName(): string;

    getVatNumber(): string;

    getAddress(): Address;

    getPhoneNumber(): string;

    getEmail(): string;

    getPriority(): number;

    getUserId(): string;

}