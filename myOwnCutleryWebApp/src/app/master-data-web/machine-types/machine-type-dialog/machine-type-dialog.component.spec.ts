import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineTypeDialogComponent } from './machine-type-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Operation } from 'src/app/models/operation.model';
import { MatDialogMock } from 'src/app/app.component.spec';
import { OperationType } from 'src/app/models/operationType.model';
import { Machine } from 'src/app/models/machine.model';
import { MachineType } from 'src/app/models/machineType.model';

describe('MachineTypeDialogComponent', () => {

  let component: MachineTypeDialogComponent;
  let fixture: ComponentFixture<MachineTypeDialogComponent>;

  let operationType = <OperationType>{
    desc: 'opTypeTest',
    executionTime: 4,
    setupTime: 5,
    operationTypeId: 1
  }

  let operationsList: Operation[] = [
    <Operation>{
      operationId: 1,
      operationType: operationType,
      tool: 'tool',
      toolId: 1
    }
  ]

  let machineType = <MachineType>{
    desc: 'machineTypeDesc',
    id: 1,
    operationList: operationsList
  }

  let data = <any>{
    listOperations: operationsList,
    machinetype: machineType,
    isEdition: true
  }

  let dialogConfig = new MatDialogConfig();
  dialogConfig.width = '425px';
  dialogConfig.height = '225px';
  dialogConfig.data = data;



  beforeEach(async() => {
    TestBed.configureTestingModule({

      imports: [AngularMaterialComponents],
      declarations: [MachineTypeDialogComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }]
    })
      .compileComponents(); 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
