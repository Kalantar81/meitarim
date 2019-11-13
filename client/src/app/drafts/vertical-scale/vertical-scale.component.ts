import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-vertical-scale',
  templateUrl: './vertical-scale.component.html',
  styleUrls: ['./vertical-scale.component.css']
})
export class VerticalScaleComponent implements OnInit {

  verticalSlider4: RangeSliderModel = {
    minValue: 0,
    maxValue: 6,
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
