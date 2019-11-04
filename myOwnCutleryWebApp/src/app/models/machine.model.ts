export class Machine {
  constructor(
    public id: number,
    public description: string,
    public machineTypeId: number,
    public productionLineId
  ) {}
}
