import { TestBed } from '@angular/core/testing';

import { ProductionPlanningScheduleService } from './production-planning-schedule.service';

describe('ProductionPlanningScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductionPlanningScheduleService = TestBed.get(ProductionPlanningScheduleService);
    expect(service).toBeTruthy();
  });
});
