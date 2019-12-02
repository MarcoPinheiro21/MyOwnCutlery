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
import { LoginComponent } from './login/login.component';
import { VisualizationWebComponent, SafePipe } from './visualization-web/visualization-web.component';
import { ClientService } from './order-management/clients/client.service';
import { ClientEditionDialogComponent } from './order-management/clients/client-edition-dialog/client-edition-dialog.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PrivacyPolicyDialogComponent } from './sign-up/privacy-policy-dialog/privacy-policy-dialog.component';
import { OrderCreationDialogComponent } from './order-management/orders/order-creation-dialog/order-creation-dialog.component';
import { ClientRightForgottenDialogComponent } from './order-management/clients/client-right-forgotten-dialog/client-right-forgotten-dialog.component';
import { OrderEditionDialogComponent } from './order-management/orders/order-edition-dialog/order-edition-dialog.component';
import { OrderCancelationDialogComponent } from './order-management/orders/order-cancelation-dialog/order-cancelation-dialog.component';

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
    LoginComponent,
    VisualizationWebComponent,
    SafePipe,
    ClientEditionDialogComponent,
    HomeComponent,
    SignUpComponent,
    PrivacyPolicyDialogComponent,
    OrderCreationDialogComponent,
    OrderEditionDialogComponent,
    ClientRightForgottenDialogComponent,
    OrderCancelationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialComponents,
    routing
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
    ClientEditionDialogComponent,
    PrivacyPolicyDialogComponent,
    ClientRightForgottenDialogComponent,
    OrderEditionDialogComponent,
    OrderCreationDialogComponent,
    OrderCancelationDialogComponent
    
  ]
})
export class AppModule { }
