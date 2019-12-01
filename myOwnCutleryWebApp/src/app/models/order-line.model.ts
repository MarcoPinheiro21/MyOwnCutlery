export class OrderLine {
    productName: string = "";
    toDelete: string = "false";
    constructor(
      public id: string, //productId
      public quantity: number,
    ) {}
  }