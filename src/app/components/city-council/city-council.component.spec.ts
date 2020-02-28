import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCouncilComponent } from './city-council.component';

describe('CityCouncilComponent', () => {
  let component: CityCouncilComponent;
  let fixture: ComponentFixture<CityCouncilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCouncilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
