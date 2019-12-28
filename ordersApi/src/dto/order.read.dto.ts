import { ProductDto } from "./product.dto";
import { CustomerDetailsDto } from "./customer.details.dto";

export class ReadOrderDto {

    public _id: string

    public customerDetails: CustomerDetailsDto;

    public products: ProductDto[];

    public deliveryDate: string;

    public expectedDeliveryDate: string;

    public status: string;
}
