import { Operation } from './operation.model';

export class MachineType {
  constructor(
    public id: number,
    public desc: string,
    public operationList: Operation[]
  ) {}
}
