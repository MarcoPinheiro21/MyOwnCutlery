
import {Product} from './product.model';
import { OrderLine } from './order-line.model';


export class Order{

constructor(

    public _id: string,
    public customerId: string,
    public products: OrderLine[],
    public deliveryDate: number
){}


}