import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineCreationDialogComponent } from './machine-creation-dialog.component';

describe('MachineCreationDialogComponent', () => {
  let component: MachineCreationDialogComponent;
  let fixture: ComponentFixture<MachineCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineCreationDialogComponent ]
    })
    .compileComponents();
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
