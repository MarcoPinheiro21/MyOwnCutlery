import { OrderStates } from "src/enums/orderStates.enum";
import { Product } from "./product.domain";
import { CustomerDetails } from "./customer-details.domain";

export interface IOrderDomain{
    
    getId(): string ;

    getStatus(): OrderStates ;

    getProducts(): Product[] ;

    getDeliveryDate(): string ;

    getCustomerDetails(): CustomerDetails ;
}