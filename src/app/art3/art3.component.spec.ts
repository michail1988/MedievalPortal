import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Art3Component } from './art3.component';

describe('Art3Component', () => {
  let component: Art3Component;
  let fixture: ComponentFixture<Art3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Art3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Art3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
