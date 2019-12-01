import { IsString, IsNotEmpty } from "class-validator";
import { Optional } from "@nestjs/common";

export class EditAddressDto{

    @Optional()
    @IsString()
    public street: string;
    
    @Optional()
    @IsString()
    public postalCode: string;
    
    @Optional()
    @IsString()
    public town: string;
    
    @Optional()
    @IsString()
    public country: string;
    
}