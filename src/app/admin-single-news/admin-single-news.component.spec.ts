import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleNewsComponent } from './admin-single-news.component';

describe('AdminSingleNewsComponent', () => {
  let component: AdminSingleNewsComponent;
  let fixture: ComponentFixture<AdminSingleNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSingleNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
