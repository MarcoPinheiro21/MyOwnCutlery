import { ProductionOperation } from './productionOperation.model';

export class Product {
    operations: ProductionOperation[]=[];
    constructor(
      public productId: number,
      public productName: string,
      public planId: number,
    ) {}
  }