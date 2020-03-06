import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorComponent } from './mayor.component';

describe('MayorComponent', () => {
  let component: MayorComponent;
  let fixture: ComponentFixture<MayorComponent>;

  beforeEach(async(() => {
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
