import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-demo',
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['./accordion-demo.component.css']
})
export class AccordionDemoComponent implements OnInit {

  public step = 0;

  public color = 'accent';
  public checked = false;
  public disabled = false;

  constructor() { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  private mouseClick() {
    alert('hello world!');
  }

}
