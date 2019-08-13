import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-vertical-range-slider',
  templateUrl: './vertical-range-slider.component.html',
  styleUrls: ['./vertical-range-slider.component.css']
})
export class VerticalRangeSliderComponent implements OnInit {


  verticalSlider: RangeSliderModel = {
    minValue: 20,
    maxValue: 80,
    options: {
      floor: 0,
      ceil: 750,
      vertical: true
    }
  };

  constructor() { }

  ngOnInit() {}

  public resetForm(): void {
    this.verticalSlider.minValue = 20;
    this.verticalSlider.maxValue = 80;
  }

}

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}
