import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictTwoComponent } from './district-two.component';

describe('DistrictTwoComponent', () => {
  let component: DistrictTwoComponent;
  let fixture: ComponentFixture<DistrictTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
