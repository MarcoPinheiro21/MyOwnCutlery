export class OperationType {
    constructor(
      public operationTypeId: number,
      public desc: string,
      public executionTime: number,
      public setupTime: number
    ) {}
  }