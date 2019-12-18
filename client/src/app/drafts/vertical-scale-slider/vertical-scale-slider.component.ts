import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-vertical-scale-slider',
  templateUrl: './vertical-scale-slider.component.html',
  styleUrls: ['./vertical-scale-slider.component.css']
})
export class VerticalScaleSliderComponent implements OnInit {

  verticalSlider6: SimpleSliderModel = {
    value: 6,
    options: {
      floor: 0,
      ceil: 6,
      vertical: true,
      showSelectionBar: true,
      showTicksValues: true,
      ticksValuesTooltip: (v: number): string => {
        return 'Tooltip for ' + v;
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

}

export interface SimpleSliderModel {
  value: number;
  options: Options;
}

interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}
