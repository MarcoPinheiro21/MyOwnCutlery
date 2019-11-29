import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditionDialogComponent } from './order-edition-dialog.component';

describe('OrderEditionDialogComponent', () => {
  let component: OrderEditionDialogComponent;
  let fixture: ComponentFixture<OrderEditionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEditionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
