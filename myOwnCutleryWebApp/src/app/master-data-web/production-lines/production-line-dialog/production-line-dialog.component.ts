import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CreateProductionLine} from 'src/app/master-data-web/production-lines/production-lines.component';
import { Machine} from 'src/app/models/machine.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-production-line-dialog',
  templateUrl: './production-line-dialog.component.html',
  styleUrls: ['./production-line-dialog.component.css']
})
export class ProductionLineDialogComponent implements OnInit {

  isSelectedMachinesEmpty : boolean;
  productionline: CreateProductionLine;
  machines: Machine[];
  elements: Element[] = [];
  displayedColumns: string[] = [
    'checked',
    'description'];

    inputFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

  constructor(private dialogRef: MatDialogRef<ProductionLineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.productionline = data.productionline;
      this.machines = data.machines;
     }

  ngOnInit() {
    this.fillElements();
  }

  
  private fillElements(){
    this.machines.forEach(mac =>{

      let e =<Element>{};
      e["checked"]=false;
      e["description"] = mac.description;
      e["machineId"]=mac.id;
      e["highlighted"]=false;
      e["hovered"]=false;
      this.elements.push(e);
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.checkEmptyMachinesList();
    if(this.inputFormControl.hasError('required')|| this.inputFormControl.hasError('minlength') || this.isSelectedMachinesEmpty) {
      return;
    }
    this.dialogRef.close({ data: this.productionline });
    return;
  }

  checkEmptyMachinesList(){
    this.isSelectedMachinesEmpty = this.productionline.MachinesListIds.length ==0;


  }

  private addMachineToProductionLine(element: Element) {
    this.productionline.MachinesListIds.push(element.machineId);
  }

  private removeMachineToProductionLine(element: Element) {
    this.productionline.MachinesListIds =
     this.productionline.MachinesListIds.filter(macId => {
      macId !== element.machineId
    });
  }

  onCheckClick(element: Element) {
    if (!element.checked) {
      this.addMachineToProductionLine(element);
    } else {
      this.removeMachineToProductionLine(element);
    }
  }

}

//o elemento é só a maquina
export interface Element{
  checked : boolean;
  description: string;
  machineId: number;
  highlighted?: boolean;
  hovered?: boolean;
}

