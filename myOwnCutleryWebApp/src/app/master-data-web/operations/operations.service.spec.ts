import { TestBed } from '@angular/core/testing';

import { OperationsService } from './operations.service';
import { HttpClientModule } from '@angular/common/http';

describe('OperationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: OperationsService = TestBed.get(OperationsService);
    expect(service).toBeTruthy();
  });
});
