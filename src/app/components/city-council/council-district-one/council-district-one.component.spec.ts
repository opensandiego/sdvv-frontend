import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CouncilDistrictOneComponent } from './council-district-one.component';

describe('CouncilDistrictOneComponent', () => {
  let component: CouncilDistrictOneComponent;
  let fixture: ComponentFixture<CouncilDistrictOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDistrictOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDistrictOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
