import { TestBed, inject } from '@angular/core/testing';

import { WorkshopResolver } from './workshop-resolver.service';

describe('WorkshopResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkshopResolver]
    });
  });

  it('should be created', inject([WorkshopResolver], (service: WorkshopResolver) => {
    expect(service).toBeTruthy();
  }));
});
