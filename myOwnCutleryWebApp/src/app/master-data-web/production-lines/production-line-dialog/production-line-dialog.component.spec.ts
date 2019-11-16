import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineDialogComponent } from './production-line-dialog.component';
import { AngularMaterialComponents } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ProductionLineDialogComponent', () => {
  let component: ProductionLineDialogComponent;
  let fixture: ComponentFixture<ProductionLineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialComponents],
      declarations: [ ProductionLineDialogComponent ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
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
