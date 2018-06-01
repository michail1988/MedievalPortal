import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronageComponent } from './patronage.component';

describe('PatronageComponent', () => {
  let component: PatronageComponent;
  let fixture: ComponentFixture<PatronageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
