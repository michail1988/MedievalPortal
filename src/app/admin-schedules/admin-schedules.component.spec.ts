import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchedulesComponent } from './admin-schedules.component';

describe('AdminSchedulesComponent', () => {
  let component: AdminSchedulesComponent;
  let fixture: ComponentFixture<AdminSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
