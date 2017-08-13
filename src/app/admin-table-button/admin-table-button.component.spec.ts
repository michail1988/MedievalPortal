import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableButtonComponent } from './admin-table-button.component';

describe('AdminTableButtonComponent', () => {
  let component: AdminTableButtonComponent;
  let fixture: ComponentFixture<AdminTableButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTableButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
