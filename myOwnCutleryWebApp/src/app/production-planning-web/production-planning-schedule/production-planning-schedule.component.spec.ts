import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPlanningScheduleComponent } from './production-planning-schedule.component';

describe('ProductionPlanningScheduleComponent', () => {
  let component: ProductionPlanningScheduleComponent;
  let fixture: ComponentFixture<ProductionPlanningScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionPlanningScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionPlanningScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
