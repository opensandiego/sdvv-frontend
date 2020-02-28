import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAttorneyComponent } from './city-attorney.component';

describe('CityAttorneyComponent', () => {
  let component: CityAttorneyComponent;
  let fixture: ComponentFixture<CityAttorneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAttorneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAttorneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
