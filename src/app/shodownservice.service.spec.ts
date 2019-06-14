import { TestBed } from '@angular/core/testing';

import { ShodownService } from './shodownservice.service';

describe('ShodownserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShodownService = TestBed.get(ShodownService);
    expect(service).toBeTruthy();
  });
});
