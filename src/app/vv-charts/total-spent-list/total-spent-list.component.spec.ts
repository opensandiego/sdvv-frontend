import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSpentListComponent } from './total-spent-list.component';

describe('TotalSpentListComponent', () => {
  let component: TotalSpentListComponent;
  let fixture: ComponentFixture<TotalSpentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSpentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSpentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
