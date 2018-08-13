import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLectureComponent } from './admin-lecture.component';

describe('AdminLectureComponent', () => {
  let component: AdminLectureComponent;
  let fixture: ComponentFixture<AdminLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
