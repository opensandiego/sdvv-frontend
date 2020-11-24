import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CandidateCardExpandedComponent } from './candidate-card-expanded.component';

describe('CandidateCardExpandedComponent', () => {
  let component: CandidateCardExpandedComponent;
  let fixture: ComponentFixture<CandidateCardExpandedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCardExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
