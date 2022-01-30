import { TestBed } from '@angular/core/testing';

import { LibUiChartsService } from './lib-ui-charts.service';

describe('LibUiChartsService', () => {
  let service: LibUiChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibUiChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
