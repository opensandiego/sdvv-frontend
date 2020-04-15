import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCardExpandedComponent } from './candidate-card-expanded.component';

describe('CandidateCardExpandedComponent', () => {
  let component: CandidateCardExpandedComponent;
  let fixture: ComponentFixture<CandidateCardExpandedComponent>;

  beforeEach(async(() => {
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
