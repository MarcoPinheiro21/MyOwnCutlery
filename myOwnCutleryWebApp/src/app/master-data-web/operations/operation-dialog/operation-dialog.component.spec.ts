import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDialogComponent } from './operation-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogMock } from 'src/app/app.component.spec';
import { Operation } from 'src/app/models/operation.model';
import { OperationType } from 'src/app/models/operationType.model';
import { Tool } from 'src/app/models/tool.model';

describe('OperationDialogComponent', () => {
  let component: OperationDialogComponent;
  let fixture: ComponentFixture<OperationDialogComponent>;
  let tools: Tool[] = [
    <Tool>{
      desc: 'toolDesc',
      toolId: 1
    }
  ]

  let operationType = <OperationType>{
    desc: 'opTypeTest',
    executionTime: 12,
    setupTime: 5,
    operationTypeId: 1
  }


  let operationTypes: OperationType[] = [
    <OperationType>{
      desc: 'opTypeTest',
      executionTime: 12,
      setupTime: 5,
      operationTypeId: 1
    }
  ]

  let operation = <Operation>{
    operationId: 1,
    operationType: operationType,
    tool: 'testTool',
    toolId: 1
  }

  let data = <any>{
    operation: operation,
    operationTypes: operationTypes,
    tools: tools
  }

  let dialogConfig = new MatDialogConfig();
  dialogConfig.width = '425px';
  dialogConfig.height = '225px';
  dialogConfig.data = data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialComponents],
      declarations: [OperationDialogComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
