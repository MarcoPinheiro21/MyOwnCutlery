import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDialogComponent } from './product-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MatDialogMock } from 'src/app/app.component.spec';
import { MachineType } from 'src/app/models/machineType.model';
import { Machine } from 'src/app/models/machine.model';
import { Operation } from 'src/app/models/operation.model';
import { OperationType } from 'src/app/models/operationType.model';
import { CreateProduct, CreatePlan, CreateOperation } from '../product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;

  let createOperations: CreateOperation[] = [
    { operationId: 1 },
    { operationId: 2 }
  ]

  let plan = <CreatePlan>{
    operations: createOperations
  }

  let product = <CreateProduct>{
    productName: 'name',
    plan: plan
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

  let data = <any>{
    product: product,
    operations: operationList
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialComponents, BrowserAnimationsModule],
      declarations: [ProductDialogComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
