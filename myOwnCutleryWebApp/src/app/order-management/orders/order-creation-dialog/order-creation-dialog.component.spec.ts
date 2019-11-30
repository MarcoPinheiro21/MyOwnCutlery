import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreationDialogComponent } from './order-creation-dialog.component';

describe('OrderCreationDialogComponent', () => {
  let component: OrderCreationDialogComponent;
  let fixture: ComponentFixture<OrderCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
