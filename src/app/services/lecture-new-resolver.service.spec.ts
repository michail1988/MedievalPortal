import { TestBed, inject } from '@angular/core/testing';

import { LectureNewResolver } from './lecture-new-resolver.service';

describe('LectureNewResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureNewResolver]
    });
  });

  it('should be created', inject([LectureNewResolver], (service: LectureNewResolver) => {
    expect(service).toBeTruthy();
  }));
});
