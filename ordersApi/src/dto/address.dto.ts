import { IsString } from "class-validator";

export class AddressDto{

    @IsString()
    street: string;
    @IsString()
    postalCode: string;
    @IsString()
    town: string;
    @IsString()
    country: string;
}