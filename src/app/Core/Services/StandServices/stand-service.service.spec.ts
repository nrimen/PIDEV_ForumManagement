import { TestBed } from '@angular/core/testing';

import { StandServiceService } from './stand-service.service';

describe('StandServiceService', () => {
  let service: StandServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
