import { Component, OnInit } from '@angular/core';

export interface  ViewFlags {
  viewMachines: boolean;
  viewMachineTypes: boolean;
  viewOperations: boolean;
}

@Component({
  selector: 'app-master-data-web',
  templateUrl: './master-data-web.component.html',
  styleUrls: ['./master-data-web.component.css']
})
export class MasterDataWebComponent implements OnInit {

  viewFlags: ViewFlags = {
    viewMachines: true,
    viewMachineTypes: false,
    viewOperations: false
  };

  constructor() { }

  ngOnInit() {
  }

  toggle(choosed: string) {
    this.setViewFlagsFalse();
    this.viewFlags['view' + choosed] = true;
  }

  setViewFlagsFalse() {
    this.viewFlags.viewMachines = false;
    this.viewFlags.viewMachineTypes = false;
    this.viewFlags.viewOperations = false;
  }

}
