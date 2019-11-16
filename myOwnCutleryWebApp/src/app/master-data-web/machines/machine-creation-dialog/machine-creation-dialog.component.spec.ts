import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MachineCreationDialogComponent } from './machine-creation-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { MachineType } from 'src/app/models/machineType.model';
import { Operation } from 'src/app/models/operation.model';
import { OperationType } from 'src/app/models/operationType.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogMock } from 'src/app/app.component.spec';


describe('MachineCreationDialogComponent', () => {
  let component: MachineCreationDialogComponent;
  let fixture: ComponentFixture<MachineCreationDialogComponent>;
  let operationType = <OperationType>{
    desc: 'opTypeTest',
    executionTime: 12,
    operationTypeId: 1,
    setupTime: 1
  }

  let machine = {
    description: '',
    machineTypeId: 0
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
      imports: [AngularMaterialComponents,
        MatDialogModule,
        BrowserAnimationsModule],
      declarations: [MachineCreationDialogComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
