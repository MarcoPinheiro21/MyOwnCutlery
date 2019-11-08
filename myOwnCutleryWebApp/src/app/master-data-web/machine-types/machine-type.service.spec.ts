import { TestBed } from '@angular/core/testing';

import { MachineTypeService } from './machine-type.service';

describe('MachineTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachineTypeService = TestBed.get(MachineTypeService);
    expect(service).toBeTruthy();
  });
});
