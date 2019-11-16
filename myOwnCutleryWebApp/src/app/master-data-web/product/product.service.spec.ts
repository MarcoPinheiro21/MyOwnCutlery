import { TestBed } from '@angular/core/testing';

import { ProductsService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });
});
