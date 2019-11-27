import {AddressDto} from "./address.dto";
import { IsString, MinLength, Matches, IsDefined, IsEmail, IsNumber, MaxLength, Min, Max } from "class-validator";

export class CustomerDto {

    public _id: string;

    @IsString()
    @MinLength(2)
    public name: string;

    @Matches(/[0-9]{9}/)
    public vatNumber: string;

    @IsDefined()
    public address: AddressDto;

    @Matches(RegExp.apply('[0-9]{9}'))
    public phoneNumber: string;

    @IsEmail()
    public email: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    public priority: number;

    public userId : string;

}
