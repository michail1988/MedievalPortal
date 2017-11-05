import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrolmentComponent } from './admin-enrolment.component';

describe('AdminEnrolmentComponent', () => {
  let component: AdminEnrolmentComponent;
  let fixture: ComponentFixture<AdminEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEnrolmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
