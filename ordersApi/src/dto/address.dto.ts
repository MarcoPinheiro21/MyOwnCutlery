import { IsString, IsNotEmpty } from "class-validator";

export class AddressDto{

    @IsNotEmpty()
    @IsString()
    public street: string;
    @IsNotEmpty()
    @IsString()
    public postalCode: string;
    @IsNotEmpty()
    @IsString()
    public town: string;
    @IsNotEmpty()
    @IsString()
    public country: string;
    
}