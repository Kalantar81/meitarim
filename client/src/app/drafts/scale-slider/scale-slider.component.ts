import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-scale-slider',
  templateUrl: './scale-slider.component.html',
  styleUrls: ['./scale-slider.component.css']
})
export class ScaleSliderComponent implements OnInit {
  minValue = 10;
  maxValue = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5,
    showTicks: true,
    showTicksValues: true
  };

  verticalSlider4: RangeSliderModel = {
    minValue: 1,
    maxValue: 5,
    options: {
      floor: 0,
      ceil: 6,
      vertical: true,
      showTicksValues: true
    }
  };

  constructor() { }

  ngOnInit() {
  }

}

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}
