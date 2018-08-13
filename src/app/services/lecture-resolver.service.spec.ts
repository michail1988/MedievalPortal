import { TestBed, inject } from '@angular/core/testing';

import { LectureResolver } from './lecture-resolver.service';

describe('LectureResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureResolver]
    });
  });

  it('should be created', inject([LectureResolver], (service: LectureResolver) => {
    expect(service).toBeTruthy();
  }));
});
