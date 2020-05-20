import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictOneComponent } from './district-one.component';

describe('DistrictOneComponent', () => {
  let component: DistrictOneComponent;
  let fixture: ComponentFixture<DistrictOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
