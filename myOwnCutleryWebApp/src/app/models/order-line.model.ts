

export class OrderLine {
   
    constructor(
      public orderId: string,
      public productName: string,
      public quantity: number,
    ) {}
  }