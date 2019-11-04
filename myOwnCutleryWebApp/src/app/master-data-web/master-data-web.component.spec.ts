import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataWebComponent } from './master-data-web.component';

describe('MasterDataWebComponent', () => {
  let component: MasterDataWebComponent;
  let fixture: ComponentFixture<MasterDataWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDataWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
