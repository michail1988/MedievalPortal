import { TestBed, inject } from '@angular/core/testing';

import { CommentNewsService } from './comment-news.service';

describe('CommentNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentNewsService]
    });
  });

  it('should be created', inject([CommentNewsService], (service: CommentNewsService) => {
    expect(service).toBeTruthy();
  }));
});
