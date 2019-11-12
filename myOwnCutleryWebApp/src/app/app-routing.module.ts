import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachinesComponent } from './master-data-web/machines/machines.component';
import { MachineTypesComponent } from './master-data-web/machine-types/machine-types.component';
import { OperationsComponent } from './master-data-web/operations/operations.component';

const routes: Routes = [
  {path:'machines', component:MachinesComponent},
  {path:'machineTypes', component:MachineTypesComponent},
  {path:'operations', component:OperationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponets = [MachinesComponent,MachineTypesComponent,OperationsComponent];
