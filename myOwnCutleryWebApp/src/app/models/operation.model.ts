export class Operation {
    constructor(
      public operationId: number,
      public toolId: number,
      public tool : string,
      public operationTypeId : number,
      public operationType: string,
    ) {}

    public equals(obj: any) : boolean { 
      return this.operationId === obj.operationId;
  } 
  }
  