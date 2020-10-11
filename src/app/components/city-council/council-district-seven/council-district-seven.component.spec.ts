import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDistrictSevenComponent } from './council-district-seven.component';

describe('CouncilDistrictSevenComponent', () => {
  let component: CouncilDistrictSevenComponent;
  let fixture: ComponentFixture<CouncilDistrictSevenComponent>;

  beforeEach(async(() => {
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
