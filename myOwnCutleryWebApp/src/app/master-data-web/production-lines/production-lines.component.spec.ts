import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductionLinesComponent } from './production-lines.component';
import { AngularMaterialComponents } from 'src/app/app.module';

describe('ProductionLinesComponent', () => {
  let component: ProductionLinesComponent;
  let fixture: ComponentFixture<ProductionLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialComponents,
      HttpClientTestingModule],
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
