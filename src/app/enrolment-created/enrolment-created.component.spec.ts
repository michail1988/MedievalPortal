import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolmentCreatedComponent } from './enrolment-created.component';

describe('EnrolmentCreatedComponent', () => {
  let component: EnrolmentCreatedComponent;
  let fixture: ComponentFixture<EnrolmentCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolmentCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
