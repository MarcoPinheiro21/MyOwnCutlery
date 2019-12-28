import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { OrderStates } from "../enums/orderStates.enum";
import { CustomerDetailsModel } from "./customer.details";
import { ProductModel } from "./product.entity";

@Entity()
export class OrderModel {

    @ObjectIdColumn()
    public _id: ObjectID;
    @Column(type => CustomerDetailsModel)
    public customerDetails: CustomerDetailsModel;
    @Column(type => ProductModel)
    public products: ProductModel[];
    @Column()
    public deliveryDate: string;
    @Column()
    public expectedDeliveryDate: string;
    @Column()
    public status: OrderStates;

    constructor(_id: ObjectID, customerDetails: CustomerDetailsModel, products: ProductModel[],
        deliveryDate?: string, expectedDeliveryDate?: string, status?: OrderStates) {
        this._id = _id;
        this.customerDetails = customerDetails;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.expectedDeliveryDate = expectedDeliveryDate;
        this.status = status != null ? status : OrderStates.INPROGRESS;
    }
}