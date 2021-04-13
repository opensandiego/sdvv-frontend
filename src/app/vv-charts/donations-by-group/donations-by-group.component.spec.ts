import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsByGroupComponent } from './donations-by-group.component';

describe('TotalSpentListComponent', () => {
  let component: DonationsByGroupComponent;
  let fixture: ComponentFixture<DonationsByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationsByGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
