import { Product } from './product.model';

export class Order {
  constructor(
    public _id: string,
    public customerId: string,
    public products: Product[],
    public deliveryDate: number
  ) {}
}
