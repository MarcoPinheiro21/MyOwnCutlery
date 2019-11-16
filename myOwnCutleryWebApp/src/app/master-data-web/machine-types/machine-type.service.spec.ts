import { TestBed } from '@angular/core/testing';

import { MachineTypeService } from './machine-type.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MachineType } from 'src/app/models/machineType.model';
import { OperationType } from 'src/app/models/operationType.model';
import { Operation } from 'src/app/models/operation.model';

describe('MachineTypeService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[MachineTypeService]
  }));

  it('should be created', () => {
    const service: MachineTypeService = TestBed.get(MachineTypeService);
    expect(service).toBeTruthy();
  });
});
