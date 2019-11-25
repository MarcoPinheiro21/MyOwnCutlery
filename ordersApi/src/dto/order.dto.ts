import { ProductDto } from "./product.dto";
import { IsString, MinLength } from "class-validator";

export class OrderDto {

    public id: string

    @IsString()
    @MinLength(1)
    public customerId: string;

    @MinLength(1, {
        each: false
    })
    public products: ProductDto[];

    public deliveryDate: number;
}
