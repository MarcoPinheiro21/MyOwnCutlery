import { Routes, RouterModule } from '@angular/router';

import { MasterDataWebComponent } from './master-data-web/master-data-web.component';
import { MachinesComponent } from './master-data-web/machines/machines.component';
import { MachineTypesComponent } from './master-data-web/machine-types/machine-types.component';
import { OperationsComponent } from './master-data-web/operations/operations.component';
import { ProductsComponent } from './master-data-web/product/product.component';
import { ProductionLinesComponent } from './master-data-web/production-lines/production-lines.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ClientsComponent } from './order-management/clients/clients.component';
import { OrdersComponent } from './order-management/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'master-data-web',
    component: MasterDataWebComponent,
    children: [
      { path: 'machines', component: MachinesComponent },
      { path: 'machineTypes', component: MachineTypesComponent },
      { path: 'operations', component: OperationsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'productionlines', component: ProductionLinesComponent }
    ]
  },
  {
    path: 'order-management',
    component: OrderManagementComponent,
    children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'orders', component: OrdersComponent }
    ]
  }
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
