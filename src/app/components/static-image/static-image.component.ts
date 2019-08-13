import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IPlayableMedia, IPlayableMediaOptions } from 'src/app/interfaces/mediainterfaces';

import { Options } from 'ng5-slider';

@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit {

  protected verticalSlider: RangeSliderModel;
  protected imageStyle: IImageStyle;
  protected sliderHeight: string;



  @Output()
  myOncanplaythrough: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.verticalSlider =  {
      minValue: 210,
      maxValue: 570,
      options: {
        floor: 0,
        ceil: 750,
        vertical: true
      }
    };
  }

  setOptions(options: IStaticImageOptions): void {
    this.imageStyle = {
      display: 'inline-block',
      background: 'url(' + options.src  + ') no-repeat center center',
      width: options.width + 'px',
      height: options.height + 'px'
    };
    this.sliderHeight = options.height.toString();
  }


}





export interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}

export interface IStaticImageOptions {
  height: number;
  width: number;
  src: string;
}

export interface IImageStyle {
  background: string;
  display?: string;
  width?: string;
  height?: string;
}
