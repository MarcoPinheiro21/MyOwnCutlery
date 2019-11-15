import {Machine} from './machine.model';

export class ProductionLine{

    constructor(
        public productionLineId : number,
        public productionLineName : string,
        public machinesListDtos : Machine[],
    ){}


}