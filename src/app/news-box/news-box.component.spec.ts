import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBoxComponent } from './news-box.component';

describe('NewsBoxComponent', () => {
  let component: NewsBoxComponent;
  let fixture: ComponentFixture<NewsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
