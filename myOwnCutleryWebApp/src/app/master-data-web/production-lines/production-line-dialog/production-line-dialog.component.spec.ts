import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineDialogComponent } from './production-line-dialog.component';

describe('ProductionLineDialogComponent', () => {
  let component: ProductionLineDialogComponent;
  let fixture: ComponentFixture<ProductionLineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionLineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
