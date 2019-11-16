import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesByTypeDialogComponent } from './machines-by-type-dialog.component';

describe('MachinesByTypeDialogComponent', () => {
  let component: MachinesByTypeDialogComponent;
  let fixture: ComponentFixture<MachinesByTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinesByTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesByTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
