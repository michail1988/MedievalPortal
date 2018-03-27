import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAdminEnrolmentComponent } from './action-admin-enrolment.component';

describe('ActionAdminEnrolmentComponent', () => {
  let component: ActionAdminEnrolmentComponent;
  let fixture: ComponentFixture<ActionAdminEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAdminEnrolmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAdminEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
