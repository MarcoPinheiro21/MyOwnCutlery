import { Component, OnInit } from '@angular/core';
import { MachineType } from 'src/app/models/machineType.model';
import { MachineTypeService } from './machine-type.service';

@Component({
  selector: 'app-machine-types',
  templateUrl: './machine-types.component.html',
  styleUrls: ['./machine-types.component.css']
})
export class MachineTypesComponent implements OnInit {

  machineTypes: MachineType[] = [];
  machineTypeService: MachineTypeService;

  constructor(_machineTypeService: MachineTypeService) {
    this.machineTypeService=_machineTypeService;
   }

  ngOnInit() {
    this.getMachineTypes();
  }

  private getMachineTypes(): void{
    this.machineTypeService.getMachineTypes().subscribe((data: any)=>{
      this.machineTypes=data;
    });
  }
}
