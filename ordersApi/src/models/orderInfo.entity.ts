import { Column, Index, PrimaryGeneratedColumn, Entity, ObjectID, PrimaryColumn, Unique, ObjectIdColumn } from "typeorm";

@Entity()
export class OrderInfoModel {

    @ObjectIdColumn()
    public _id: ObjectID;
    @Column()
    @Index({ unique: true })
    public productId: string;
    @Column()
    public sumQuantity: number;
    @Column()
    public totalOrders: number;

    constructor(productId: string, sumQuantity: number, totalOrders: number, id?: ObjectID) {
        this._id = id == undefined ? null : id;
        this.productId = productId;
        this.sumQuantity = sumQuantity;
        this.totalOrders = totalOrders;
    }
}