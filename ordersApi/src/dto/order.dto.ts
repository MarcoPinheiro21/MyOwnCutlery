import { ProductDto } from "./product.dto";
import { IsString, MinLength, IsEmpty, IsDateString } from "class-validator";

export class OrderDto {

    public _id: string

    @IsString()
    @MinLength(1)
    public customerId: string;

    public products: ProductDto[];

    @IsDateString()
    public deliveryDate: string;

    @IsEmpty()
    public status: string;
}
