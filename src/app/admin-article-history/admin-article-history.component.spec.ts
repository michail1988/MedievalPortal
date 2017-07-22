import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleHistoryComponent } from './admin-article-history.component';

describe('AdminArticleHistoryComponent', () => {
  let component: AdminArticleHistoryComponent;
  let fixture: ComponentFixture<AdminArticleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
