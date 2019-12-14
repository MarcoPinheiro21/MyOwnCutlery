import { ProductionOperation } from './productionOperation.model';

export class Product {
  operations: ProductionOperation[] = [];
  productionTime: number = 0;
  constructor(
    public productId: number,
    public productName: string,
    public planId: number,
    public sumQuantity: number,
    public totalOrders: number
  ) { }

}