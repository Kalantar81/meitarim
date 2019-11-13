import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDesignComponent } from './text-design.component';

describe('TextDesignComponent', () => {
  let component: TextDesignComponent;
  let fixture: ComponentFixture<TextDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
