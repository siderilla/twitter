import { TestBed } from '@angular/core/testing';

import { ChirrupService } from './cinguettio.service';

describe('ChirrupService', () => {
  let service: ChirrupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChirrupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
