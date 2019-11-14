import { MachineType } from './machineType.model';
import { CreateMachine } from './createMachine.model';

export class Machine {
  constructor(
    public id: number,
    public description: string,
    public machineType: MachineType,
    public machineTypeId: number,
    public productionLineId: number
  ) { }
}
