import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MachineTypesComponent } from './machine-types.component';
import { AngularMaterialComponents } from 'src/app/app.module';


describe('MachineTypesComponent', () => {
  let component: MachineTypesComponent;
  let fixture: ComponentFixture<MachineTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AngularMaterialComponents,
        HttpClientTestingModule],
      declarations: [ MachineTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
