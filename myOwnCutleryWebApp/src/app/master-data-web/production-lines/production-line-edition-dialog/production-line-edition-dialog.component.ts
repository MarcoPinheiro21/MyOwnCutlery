import { Component, OnInit, Inject } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductionLine } from 'src/app/models/productionLine.model';
import { CreateProductionLine } from '../production-lines.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-production-line-edition-dialog',
  templateUrl: './production-line-edition-dialog.component.html',
  styleUrls: ['./production-line-edition-dialog.component.css']
})
export class ProductionLineEditionDialogComponent implements OnInit {

  isSelectedMachinesEmpty: boolean;
  productionline: CreateProductionLine;
  machines: Machine[];
  elements: Element[] = [];
  displayedColumns: string[] = [
    'checked',
    'description'];

  inputFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private dialogRef: MatDialogRef<ProductionLineEditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

      const machineIds = [];
      data.productionLine.machinesListDtos.map(mac => {
        machineIds.push(mac.id);
      });
      this.productionline = {
        ProductionLineName: data.productionLine.productionLineName,
        MachinesListIds: machineIds
      };
      this.machines = data.machines;
     }

  ngOnInit() {
    this.fillElements();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.productionline });
  }

  // private addMachineToProductionLine(element: Element) {
  //   this.productionline.MachinesListIds.push(element.machineId);
  // }

  // private removeMachineToProductionLine(element: Element) {
  //   this.productionline.MachinesListIds =
  //    this.productionline.MachinesListIds.filter(macId => {
  //     macId !== element.machineId
  //   });
  // }

  private addMachineToProductionLine(element: Element) {
    this.machines.map(mac => {
      if (mac.id === element.machineId) {
        this.productionline.MachinesListIds.push(mac.id);
        return;
      }
    });
  }

  private removeMachineToProductionLine(element: Element) {
    const machines = [];
    this.productionline.MachinesListIds.map(mac => {
      if (mac !== element.machineId) {
        machines.push(mac);
      }
    });
    this.productionline.MachinesListIds = machines;
  }

  onCheckClick(element: Element) {
    if (!element.checked) {
      this.addMachineToProductionLine(element);
    } else {
      this.removeMachineToProductionLine(element);
    }
  }

  private fillElements() {
    this.machines.forEach(mac => {
      let e = <Element>{};
      var belongsToThisProductionLine = this.containsMachine(mac.id);
      e['checked'] = belongsToThisProductionLine;
      e['description'] = mac.description;
      e['machineId'] = mac.id;
      e['highlighted'] = false;
      e['hovered'] = false;
      this.elements.push(e);
    });
  }

  containsMachine(p) {
    let boo = false;
    this.productionline.MachinesListIds.forEach(mac => {
      if (mac === p) {
        boo = true;
      }
    });
    return boo;
  }

}

export interface Element {
  checked: boolean;
  description: string;
  machineId: number;
  highlighted?: boolean;
  hovered?: boolean;
}
