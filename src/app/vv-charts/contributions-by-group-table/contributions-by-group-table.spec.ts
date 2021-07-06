import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsByGroupTableComponent } from './contributions-by-group-table.component';

describe('TotalSpentListComponent', () => {
  let component: ContributionsByGroupTableComponent;
  let fixture: ComponentFixture<ContributionsByGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionsByGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionsByGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
