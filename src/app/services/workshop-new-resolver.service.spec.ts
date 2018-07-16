import { TestBed, inject } from '@angular/core/testing';

import { WorkshopNewResolver } from './workshop-new-resolver.service';

describe('WorkshopNewResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkshopNewResolver]
    });
  });

  it('should be created', inject([WorkshopNewResolver], (service: WorkshopNewResolver) => {
    expect(service).toBeTruthy();
  }));
});
