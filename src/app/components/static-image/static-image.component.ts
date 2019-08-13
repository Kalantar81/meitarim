import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IPlayableMedia, IPlayableMediaOptions } from 'src/app/interfaces/mediainterfaces';

import { Options } from 'ng5-slider';

@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit {

  verticalSlider: RangeSliderModel = {
    minValue: 210,
    maxValue: 570,
    options: {
      floor: 0,
      ceil: 750,
      vertical: true
    }
  };

  private myOptions: IStaticImageOptions;

  protected myStyle: any;
  protected myHeight: string;



  @Output()
  myOncanplaythrough: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  setOptions(option: IStaticImageOptions): void {
    this.myOptions = option;
    const myStyle = {
      display: 'inline-block',
      background: 'url(' + this.myOptions.src  + ') no-repeat center center',
      width: this.myOptions.width + 'px',
      height: this.myOptions.height + 'px'
     };
    this.myStyle = myStyle;
    this.myHeight = option.height.toString();
  }

  setCurrentPosition(position: number): void {
    throw new Error('Method not implemented.');
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
