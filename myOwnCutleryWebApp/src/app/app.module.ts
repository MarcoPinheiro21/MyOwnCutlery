import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MasterDataWebComponent } from './master-data-web/master-data-web.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatExpansionModule, MatTableModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MachinesService } from './master-data-web/machines/machines.service';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './master-data-web/product/product.service';
import { MachineTypeDialogComponent } from './master-data-web/machine-types/machine-type-dialog/machine-type-dialog.component';
import { MachineCreationDialogComponent } from './master-data-web/machines/machine-creation-dialog/machine-creation-dialog.component';
import { MachineEditionDialogComponent } from './master-data-web/machines/machine-edition-dialog/machine-edition-dialog.component';
import { OperationDialogComponent } from './master-data-web/operations/operation-dialog/operation-dialog.component';
import { ProductDialogComponent } from './master-data-web/product/product-dialog/product-dialog.component';
import { ProductionLineService } from './master-data-web/production-lines/production-lines.service';
import { ProductionLineDialogComponent } from './master-data-web/production-lines/production-line-dialog/production-line-dialog.component';
import { MachinesByTypeDialogComponent } from './master-data-web/machine-types/machines-by-type-dialog/machines-by-type-dialog.component';
import { MachinesComponent } from './master-data-web/machines/machines.component';
import { MachineTypesComponent } from './master-data-web/machine-types/machine-types.component';
import { OperationsComponent } from './master-data-web/operations/operations.component';
import { ProductsComponent } from './master-data-web/product/product.component';
import { ProductionLinesComponent } from './master-data-web/production-lines/production-lines.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ClientsComponent } from './order-management/clients/clients.component';
import { OrdersComponent } from './order-management/orders/orders.component';
import { VisualizationWebComponent, SafePipe } from './visualization-web/visualization-web.component';
import { ClientService } from './order-management/clients/client.service';
import { ClientEditionDialogComponent } from './order-management/clients/client-edition-dialog/client-edition-dialog.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const AngularMaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTableModule,
];




@NgModule({
  declarations: [
    AppComponent,
    MasterDataWebComponent,
    MachineTypeDialogComponent,
    MachineCreationDialogComponent,
    MachineEditionDialogComponent,
    OperationDialogComponent,
    ProductDialogComponent,
    ProductionLineDialogComponent,
    MachinesByTypeDialogComponent,
    MachinesComponent,
    MachineTypesComponent,
    OperationsComponent,
    ProductsComponent,
    ProductionLinesComponent,
    OrderManagementComponent,
    ClientsComponent,
    OrdersComponent,
    VisualizationWebComponent,
    SafePipe,
    ClientEditionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialComponents,
    routing,
    NgxMaskModule
  ],
  providers: [
    MachinesService,
    ProductsService,
    ProductionLineService,
    appRoutingProviders,
    ClientService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MachineEditionDialogComponent,
    MachineCreationDialogComponent,
    MachineTypeDialogComponent,
    OperationDialogComponent,
    ProductDialogComponent,
    ProductionLineDialogComponent,
    MachinesByTypeDialogComponent,
    ClientEditionDialogComponent
  ]
})
export class AppModule { }
