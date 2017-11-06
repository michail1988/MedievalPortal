import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMailboxComponent } from './admin-mailbox.component';

describe('AdminMailboxComponent', () => {
  let component: AdminMailboxComponent;
  let fixture: ComponentFixture<AdminMailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMailboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
