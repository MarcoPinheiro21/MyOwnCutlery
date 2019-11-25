import {AddressDto} from "./address.dto";
import { IsString, MinLength } from "class-validator";

export class CustomerDto {

    public id: string;
    public name: string;
    public vatNumber: string;
    public address: AddressDto;
    public phoneNumber: string;
    public email: string;
    public priority: number;

}
