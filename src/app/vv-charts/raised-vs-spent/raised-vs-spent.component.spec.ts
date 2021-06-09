import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedVsSpentComponent } from './raised-vs-spent.component';

describe('RaisedVsSpentComponent', () => {
  let component: RaisedVsSpentComponent;
  let fixture: ComponentFixture<RaisedVsSpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedVsSpentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedVsSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
