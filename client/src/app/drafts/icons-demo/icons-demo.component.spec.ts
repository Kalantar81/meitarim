import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsDemoComponent } from './icons-demo.component';

describe('IconsDemoComponent', () => {
  let component: IconsDemoComponent;
  let fixture: ComponentFixture<IconsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
