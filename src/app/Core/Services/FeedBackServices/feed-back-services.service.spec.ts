import { TestBed } from '@angular/core/testing';

import { FeedBackServicesService } from './feed-back-services.service';

describe('FeedBackServicesService', () => {
  let service: FeedBackServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedBackServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
