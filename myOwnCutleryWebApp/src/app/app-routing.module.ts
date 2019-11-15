import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachinesComponent } from './master-data-web/machines/machines.component';
import { MachineTypesComponent } from './master-data-web/machine-types/machine-types.component';
import { OperationsComponent } from './master-data-web/operations/operations.component';
import { ProductsComponent } from './master-data-web/product/product.component';
import { ProductionLinesComponent } from './master-data-web/production-lines/production-lines.component';

const routes: Routes = [
  {path:'machines', component:MachinesComponent},
  {path:'machineTypes', component:MachineTypesComponent},
  {path:'operations', component:OperationsComponent},
  {path:'products', component:ProductsComponent},
  {path:'productionlines', component:ProductionLinesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MachinesComponent,MachineTypesComponent,OperationsComponent,ProductsComponent,ProductionLinesComponent];
