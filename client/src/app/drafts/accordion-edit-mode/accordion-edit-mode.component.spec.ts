import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionEditModeComponent } from './accordion-edit-mode.component';

describe('AccordionEditModeComponent', () => {
  let component: AccordionEditModeComponent;
  let fixture: ComponentFixture<AccordionEditModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionEditModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
