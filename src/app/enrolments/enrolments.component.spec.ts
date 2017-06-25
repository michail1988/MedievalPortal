/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnrolmentsComponent } from './enrolments.component';

describe('EnrolmentsComponent', () => {
  let component: EnrolmentsComponent;
  let fixture: ComponentFixture<EnrolmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
