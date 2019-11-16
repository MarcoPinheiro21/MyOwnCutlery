import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineDialogComponent } from './production-line-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MatDialogMock } from 'src/app/app.component.spec';
import { CreateProductionLine } from '../production-lines.component';
import { Machine } from 'src/app/models/machine.model';
import { MachineType } from 'src/app/models/machineType.model';
import { Operation } from 'src/app/models/operation.model';
import { OperationType } from 'src/app/models/operationType.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductionLineDialogComponent', () => {
  let component: ProductionLineDialogComponent;
  let fixture: ComponentFixture<ProductionLineDialogComponent>;

  let createProductionLine = <CreateProductionLine>{
    MachinesListIds:[1,2,3],
    ProductionLineName:'plName'
  }

  let operationType = <OperationType>{
    desc: 'opTypeTest',
    executionTime: 12,
    operationTypeId: 1,
    setupTime: 1
  }

  let operationList: Operation[] = [
    <Operation>{
      operationId: 1,
      operationType: operationType,
      tool: 'toolTest',
      toolId: 1
    }
  ]

  let machineType = <MachineType>{
    desc: 'machineTypeTest',
    id: 1,
    operationList: operationList
  }

  let machines : Machine[] = [
    <Machine>{
      description:'machineDesc',
      id:1,
      machineType:machineType,
      machineTypeId:1,
      productionLineId:1
    }
  ]

  let data = <any>{
    productionline: createProductionLine,
    machines: machines
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialComponents, BrowserAnimationsModule],
      declarations: [ ProductionLineDialogComponent ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
