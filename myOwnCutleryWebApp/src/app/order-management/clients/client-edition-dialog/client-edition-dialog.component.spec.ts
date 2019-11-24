import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditionDialogComponent } from './client-edition-dialog.component';

describe('ClientEditionDialogComponent', () => {
  let component: ClientEditionDialogComponent;
  let fixture: ComponentFixture<ClientEditionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEditionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
