import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-edit-mode',
  templateUrl: './accordion-edit-mode.component.html',
  styleUrls: ['./accordion-edit-mode.component.css']
})
export class AccordionEditModeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public mouseClick() {
    alert('hello');
  }
}
