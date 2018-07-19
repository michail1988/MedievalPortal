import { TestBed, inject } from '@angular/core/testing';

import { WorkshopsUserService } from './workshops-user.service';

describe('WorkshopsUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkshopsUserService]
    });
  });

  it('should be created', inject([WorkshopsUserService], (service: WorkshopsUserService) => {
    expect(service).toBeTruthy();
  }));
});
