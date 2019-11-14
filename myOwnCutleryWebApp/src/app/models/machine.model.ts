import { MachineType } from './machineType.model';

export class Machine {
  constructor(
    public id: number,
    public description: string,
    public machineType: MachineType,
    public machineTypeId: number,
    public productionLineId: number
  ) { }
}
