import { TestBed, inject } from '@angular/core/testing';

import { SeatBookigServiceService } from './seat-bookig-service.service';

describe('SeatBookigServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeatBookigServiceService]
    });
  });

  it('should be created', inject([SeatBookigServiceService], (service: SeatBookigServiceService) => {
    expect(service).toBeTruthy();
  }));
});
