import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreationDialogComponent } from './client-creation-dialog.component';

describe('ClientCreationDialogComponent', () => {
  let component: ClientCreationDialogComponent;
  let fixture: ComponentFixture<ClientCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
