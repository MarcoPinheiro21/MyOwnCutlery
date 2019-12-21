import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPlanningWebComponent } from './production-planning-web.component';

describe('ProductionPlanningWebComponent', () => {
  let component: ProductionPlanningWebComponent;
  let fixture: ComponentFixture<ProductionPlanningWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionPlanningWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionPlanningWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
