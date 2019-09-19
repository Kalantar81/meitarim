import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTableEditComponent } from './color-table-edit.component';

describe('ColorTableEditComponent', () => {
  let component: ColorTableEditComponent;
  let fixture: ComponentFixture<ColorTableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorTableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
