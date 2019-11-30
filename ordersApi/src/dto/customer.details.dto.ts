import { AddressDto } from "./address.dto";

export class CustomerDetailsDto {

    id: string;
    name:string;
    vatNumber: string;
    deliveryAddress: AddressDto;
}