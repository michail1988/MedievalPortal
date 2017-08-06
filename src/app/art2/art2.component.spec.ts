import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Art2Component } from './art2.component';

describe('Art2Component', () => {
  let component: Art2Component;
  let fixture: ComponentFixture<Art2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Art2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Art2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
