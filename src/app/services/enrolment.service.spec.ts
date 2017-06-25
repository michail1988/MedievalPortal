/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnrolmentService } from './enrolment.service';

describe('EnrolmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrolmentService]
    });
  });

  it('should ...', inject([EnrolmentService], (service: EnrolmentService) => {
    expect(service).toBeTruthy();
  }));
});
