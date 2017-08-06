import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Art1Component } from './art1.component';

describe('Art1Component', () => {
  let component: Art1Component;
  let fixture: ComponentFixture<Art1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Art1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Art1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
