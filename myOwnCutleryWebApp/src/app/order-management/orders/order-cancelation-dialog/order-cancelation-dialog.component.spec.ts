import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelationDialogComponent } from './order-cancelation-dialog.component';

describe('OrderCancelationDialogComponent', () => {
  let component: OrderCancelationDialogComponent;
  let fixture: ComponentFixture<OrderCancelationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancelationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
