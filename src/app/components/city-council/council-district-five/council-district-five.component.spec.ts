import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDistrictFiveComponent } from './council-district-five.component';

describe('CouncilDistrictFiveComponent', () => {
  let component: CouncilDistrictFiveComponent;
  let fixture: ComponentFixture<CouncilDistrictFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDistrictFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDistrictFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
