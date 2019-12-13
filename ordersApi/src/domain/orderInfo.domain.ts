
export class OrderInfo {

    private _id: string;

    private productId: string;

    private sumQuantity: number;

    private totalOrders: number;

    constructor(productId: string, sumQuantity?: number, totalOrders?: number, id? : string) {
        this._id=id;
        this.productId = productId;
        this.sumQuantity = sumQuantity == null ? 0 : sumQuantity;
        this.totalOrders = totalOrders == null ? 0 : totalOrders;
    }

    public getId():string{
        return this._id;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getSumQuantity(): number {
        return this.sumQuantity;
    }

    public getTotalOrders(): number {
        return this.totalOrders;
    }

    public addOrder(quantity: number) {
        this.sumQuantity = this.sumQuantity + quantity;
        this.totalOrders++;
    }

    public removeOrder(quantity: number) {
        this.sumQuantity = this.sumQuantity - quantity;
        this.totalOrders--;
    }

    public increaseQuantity(quantity: number) {
        this.sumQuantity = this.sumQuantity + quantity;
    }

    public decreaseQuantity(quantity: number) {
        this.sumQuantity = this.sumQuantity - quantity;
    }
}