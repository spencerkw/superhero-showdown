import { TestBed } from '@angular/core/testing';

import { ShodownserviceService } from './shodownservice.service';

describe('ShodownserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShodownserviceService = TestBed.get(ShodownserviceService);
    expect(service).toBeTruthy();
  });
});
