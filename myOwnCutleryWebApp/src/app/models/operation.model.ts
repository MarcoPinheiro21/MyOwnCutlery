import { OperationType } from './operationType.model';

export class Operation {
    constructor(
      public operationId: number,
      public toolId: number,
      public tool : string,
      public operationType: OperationType
    ) {}

    public equals(obj: any) : boolean { 
      return this.operationId === obj.operationId;
  } 
  }
  