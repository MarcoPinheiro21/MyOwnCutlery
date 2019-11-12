import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineTypeDialogComponent } from './machine-type-dialog.component';

describe('MachineTypeDialogComponent', () => {
  let component: MachineTypeDialogComponent;
  let fixture: ComponentFixture<MachineTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
