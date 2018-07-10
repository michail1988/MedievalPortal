import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAdminPaymentComponent } from './action-admin-payment.component';

describe('ActionAdminPaymentComponent', () => {
  let component: ActionAdminPaymentComponent;
  let fixture: ComponentFixture<ActionAdminPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAdminPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAdminPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
