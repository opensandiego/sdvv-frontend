import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CouncilDistrictNineComponent } from './council-district-nine.component';

describe('CouncilDistrictNineComponent', () => {
  let component: CouncilDistrictNineComponent;
  let fixture: ComponentFixture<CouncilDistrictNineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDistrictNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDistrictNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
