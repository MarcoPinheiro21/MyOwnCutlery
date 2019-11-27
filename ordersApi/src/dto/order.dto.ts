import { ProductDto } from "./product.dto";
import { IsString, MinLength } from "class-validator";

export class OrderDto {

    public _id: string

    @IsString()
    @MinLength(1)
    public customerId: string;

    public products: ProductDto[];

    public deliveryDate: number;
}
