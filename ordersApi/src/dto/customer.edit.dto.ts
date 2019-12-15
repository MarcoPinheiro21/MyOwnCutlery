import { AddressDto } from "./address.dto";
import { IsString, MinLength, Matches, IsDefined, IsEmail, IsNumber, MaxLength, Min, Max, IsOptional, ValidateIf } from "class-validator";

export class EditCustomerDto {

    public _id: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    public name: string;

    @IsOptional()
    @Matches(/[0-9]{9}/)
    public vatNumber: string;

    @IsOptional()
    @IsDefined()
    public address: AddressDto;

    @IsOptional()
    @Matches(/[0-9]{9}/)
    public phoneNumber: string;

    @IsOptional()
    @IsEmail()
    public email: string;

    @IsOptional()
    @IsNumber()
    public priority: number;

    @IsOptional()
    @IsString()
    public userId: string;

}