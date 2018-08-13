import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLecturesComponent } from './admin-lectures.component';

describe('AdminLecturesComponent', () => {
  let component: AdminLecturesComponent;
  let fixture: ComponentFixture<AdminLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLecturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
