import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineEditionDialogComponent } from './production-line-edition-dialog.component';

describe('ProductionLineEditionDialogComponent', () => {
  let component: ProductionLineEditionDialogComponent;
  let fixture: ComponentFixture<ProductionLineEditionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionLineEditionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLineEditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
