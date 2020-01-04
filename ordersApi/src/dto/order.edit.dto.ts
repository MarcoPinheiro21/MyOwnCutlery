import { IsDateString, IsOptional } from "class-validator";
import { EditProductDto } from "./product.dto.edit";
import { EditAddressDto } from "./address.edit.dto";

export class EditOrderDto {

    public products: EditProductDto[];

    public deliveryAddress : EditAddressDto;

    @IsDateString()
    public deliveryDate: string;

    @IsOptional()
    @IsDateString()
    public expectedDeliveryDate: string;

}
