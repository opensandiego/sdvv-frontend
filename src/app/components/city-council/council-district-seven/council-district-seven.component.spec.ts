import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CouncilDistrictSevenComponent } from './council-district-seven.component';

describe('CouncilDistrictSevenComponent', () => {
  let component: CouncilDistrictSevenComponent;
  let fixture: ComponentFixture<CouncilDistrictSevenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDistrictSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDistrictSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
