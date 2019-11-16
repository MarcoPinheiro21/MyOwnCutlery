import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineEditionDialogComponent } from './machine-edition-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogMock } from 'src/app/app.component.spec';
import { OperationType } from 'src/app/models/operationType.model';
import { Operation } from 'src/app/models/operation.model';
import { MachineType } from 'src/app/models/machineType.model';
import { Machine } from 'src/app/models/machine.model';
import { CreateMachine } from '../machines.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MachineEditionDialogComponent', () => {
  let component: MachineEditionDialogComponent;
  let fixture: ComponentFixture<MachineEditionDialogComponent>;
  let operationType = <OperationType>{
    desc: 'opTypeTest',
    executionTime: 12,
    operationTypeId: 1,
    setupTime: 1
  }

  let machine = <Machine>{
    description: 'test',
    machineTypeId: 0,
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

  let mTypes: MachineType[] = [machineType];
  let data = <any>{
    machineTypes: mTypes,
    machine: machine
  }

  let dialogConfig = new MatDialogConfig();
  dialogConfig.width = '425px';
  dialogConfig.height = '225px';
  dialogConfig.data = data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialComponents,BrowserAnimationsModule],
      declarations: [ MachineEditionDialogComponent ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineEditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
