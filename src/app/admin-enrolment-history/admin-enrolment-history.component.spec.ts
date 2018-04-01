import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrolmentHistoryComponent } from './admin-enrolment-history.component';

describe('AdminEnrolmentHistoryComponent', () => {
  let component: AdminEnrolmentHistoryComponent;
  let fixture: ComponentFixture<AdminEnrolmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEnrolmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnrolmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
