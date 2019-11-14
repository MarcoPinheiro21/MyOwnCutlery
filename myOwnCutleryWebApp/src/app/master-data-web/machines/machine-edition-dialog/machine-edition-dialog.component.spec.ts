import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineEditionDialogComponent } from './machine-edition-dialog.component';

describe('MachineEditionDialogComponent', () => {
  let component: MachineEditionDialogComponent;
  let fixture: ComponentFixture<MachineEditionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineEditionDialogComponent ]
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
