import { MachineType } from './machineType.model';
import { ProductionLine } from './productionLine.model';

export class Machine {
  constructor(
    public id: number,
    public description: string,
    public active : Boolean,
    public machineType: MachineType,
    public machineTypeId: number,
    public productionLineId: number,
    public productionLine: ProductionLine
  ) { }
}
