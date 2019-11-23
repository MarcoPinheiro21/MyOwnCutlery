import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationWebComponent } from './visualization-web.component';

describe('VisualizationWebComponent', () => {
  let component: VisualizationWebComponent;
  let fixture: ComponentFixture<VisualizationWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
