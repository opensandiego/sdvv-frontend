import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CandidateService } from './candidate.service';

describe('CandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: CandidateService = TestBed.inject(CandidateService);
    expect(service).toBeTruthy();
  });
});
