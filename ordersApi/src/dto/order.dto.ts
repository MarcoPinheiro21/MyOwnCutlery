import { ProductDto } from "./product.dto";
import { IsString, MinLength, IsEmpty, IsDateString } from "class-validator";
import { IsNull } from "typeorm";

export class OrderDto {

    public _id: string

    @IsString()
    @MinLength(1)
    public customerId: string;

    public products: ProductDto[];

    @IsDateString()
    public deliveryDate: string;

    @IsEmpty()
    public status : string;
}
