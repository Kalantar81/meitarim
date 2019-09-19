import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSettingsComponent } from './accordion-settings.component';

describe('AccordionSettingsComponent', () => {
  let component: AccordionSettingsComponent;
  let fixture: ComponentFixture<AccordionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
