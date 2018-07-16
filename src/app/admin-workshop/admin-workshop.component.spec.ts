import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkshopComponent } from './admin-workshop.component';

describe('AdminWorkshopComponent', () => {
  let component: AdminWorkshopComponent;
  let fixture: ComponentFixture<AdminWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
