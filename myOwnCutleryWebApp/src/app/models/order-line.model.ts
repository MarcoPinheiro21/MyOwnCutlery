export class OrderLine {
    productName: string = "";
    constructor(
      public id: string, //productId
      public quantity: number,
    ) {}
  }