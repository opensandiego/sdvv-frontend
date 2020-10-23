import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDistrictThreeComponent } from './council-district-three.component';

describe('CouncilDistrictThreeComponent', () => {
  let component: CouncilDistrictThreeComponent;
  let fixture: ComponentFixture<CouncilDistrictThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDistrictThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDistrictThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
