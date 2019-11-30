import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRightForgottenDialogComponent } from './client-right-forgotten-dialog.component';

describe('ClientRightForgottenDialogComponent', () => {
  let component: ClientRightForgottenDialogComponent;
  let fixture: ComponentFixture<ClientRightForgottenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRightForgottenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRightForgottenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
