import { OrderLine } from "./order-line.model";

export class Order {
  constructor(
    public _id: string,
    public customerDetails: CustomerDetails,
    public products: OrderLine[],
    public deliveryDate: string,
    public possibleDeliveryDate: string,
    public status: string
  ) {}
}

export class CustomerDetails {
  constructor(
    public id: string,
    public name: string,
    public vatNumber: string,
    public deliveryAddress:DeliveryAddress 
  ) {}
}

export class DeliveryAddress {
  constructor(
    public street: string,
    public postalCode: string,
    public town: string,
    public country: string
  ) {}
}
