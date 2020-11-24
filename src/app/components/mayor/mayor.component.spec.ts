import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MayorComponent } from './mayor.component';

describe('MayorComponent', () => {
  let component: MayorComponent;
  let fixture: ComponentFixture<MayorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MayorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
