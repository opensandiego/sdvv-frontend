import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibUiChartsComponent } from './lib-ui-charts.component';

describe('LibUiChartsComponent', () => {
  let component: LibUiChartsComponent;
  let fixture: ComponentFixture<LibUiChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibUiChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibUiChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
