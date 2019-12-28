import { IsDateString } from "class-validator";
import { EditProductDto } from "./product.dto.edit";
import { EditAddressDto } from "./address.edit.dto";

export class EditOrderDto {

    public products: EditProductDto[];

    public deliveryAddress : EditAddressDto;

    @IsDateString()
    public deliveryDate: string;

    @IsDateString()
    public expectedDeliveryDate: string;

}
