import { TestBed } from '@angular/core/testing';

import { MachineTypeService } from './machine-type.service';
import { HttpClientModule } from '@angular/common/http';

describe('MachineTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MachineTypeService = TestBed.get(MachineTypeService);
    expect(service).toBeTruthy();
  });
});
