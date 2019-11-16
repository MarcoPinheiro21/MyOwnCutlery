import { TestBed } from '@angular/core/testing';

import { MachinesService } from './machines.service';
import { HttpClientModule } from '@angular/common/http';

describe('MachinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MachinesService = TestBed.get(MachinesService);
    expect(service).toBeTruthy();
  });
});
