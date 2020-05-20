import { TestBed } from '@angular/core/testing';

import { BikerService } from './biker.service';

describe('BikerService', () => {
  let service: BikerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
