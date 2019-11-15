import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLinesComponent } from './production-lines.component';

describe('ProductionLinesComponent', () => {
  let component: ProductionLinesComponent;
  let fixture: ComponentFixture<ProductionLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
