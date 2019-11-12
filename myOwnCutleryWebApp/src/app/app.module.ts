import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponets } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MasterDataWebComponent } from './master-data-web/master-data-web.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MachinesService } from './master-data-web/machines/machines.service';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { MachineDialogComponent } from './master-data-web/machines/machine-dialog/machine-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MachineTypeService } from './master-data-web/machine-types/machine-type.service';
import { OperationsService } from './master-data-web/operations/operations.service';
import { ProductsService } from './master-data-web/product/product.service';
import { ProductsComponent } from './master-data-web/product/product.component';
import { MachineTypeDialogComponent } from './master-data-web/machine-types/machine-type-dialog/machine-type-dialog.component';

const AngularMaterialComponents = [
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
  MatExpansionModule
];

@NgModule({
  declarations: [
    AppComponent,
    MasterDataWebComponent,
    MachineDialogComponent,
    OperationsComponent,
    ProductsComponent
    MachineTypeDialogComponent,
    routingComponets
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialComponents,
  ],
  providers: [MachinesService,ProductsService],
  bootstrap: [AppComponent],
  entryComponents: [MachineDialogComponent, MachineTypeDialogComponent]
})
export class AppModule { }
