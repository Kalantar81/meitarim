import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { IPlayableMedia, IPlayableMediaOptions } from 'src/app/interfaces/mediainterfaces';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Options } from 'ng5-slider';
import { SegmentParamsDialogComponent } from 'src/app/popboxes/segment-params-dialog/segment-params-dialog.component';
import { SliderConfigPopboxComponent } from 'src/app/popboxes/slider-config-popbox/slider-config-popbox.component';

@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit, OnChanges {

  protected verticalSlider: RangeSliderModel;
  protected segmentParams: ISegmetParams;
  protected imageStyle: IImageStyle;
  protected sliderHeight: string;

  protected options: Options;

  @Output()
  myOncanplaythrough: EventEmitter<string> = new EventEmitter<string>();

  constructor( public dialog: MatDialog ) { }

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

    this.initSegmentParams();
  }

  ngOnChanges() {}

  setOptions(options: IStaticImageOptions): void {
    this.imageStyle = {
      display: 'inline-block',
      background: 'url(' + options.src  + ') no-repeat center center',
      width: options.width + 'px',
      height: options.height + 'px'
    };
    this.sliderHeight = options.height.toString();
  }

  /** #startDialogBox methods */
    public openDialog(): void {
      this.initSegmentParams();
      const dialogRef = this.dialog.open(
        SegmentParamsDialogComponent,
        {
          width: '350px',
          height: '450px',
          data: this.segmentParams
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed');
          this.segmentParams = result;
          this.changeVerticalSliderParams();
          alert( ' חתך בשם ' + this.segmentParams.name + ' נשלח לשרת ');
        }

      });
    }

    private initSegmentParams(): void {
      this.segmentParams = {
        startPoint: this.verticalSlider.minValue,
        endPoint: this.verticalSlider.maxValue,
        minPossibleValue: this.verticalSlider.options.floor,
        maxPossibleValue: this.verticalSlider.options.ceil
      };
  }

  private changeVerticalSliderParams(): void {
    this.verticalSlider =  {
      minValue: this.segmentParams.startPoint,
      maxValue: this.segmentParams.endPoint,
      options: {
        floor: 0,
        ceil: 750,
        vertical: true
      }
    };
  }

/** #endDialogBox methods */

/** #startSliderSettingsDialogBox methods */
public openSliderSettingsDialog(): void {
  const dialogRef = this.dialog.open(
    SliderConfigPopboxComponent,
    {
      width: '800px',
      height: '700px',
      data: this.verticalSlider
    }
  );

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result.options) {
      this.options = result.options;
      this.initOptions();
    }
  });
}

initOptions(): void {
  this.verticalSlider = {
    minValue: this.segmentParams.startPoint,
    maxValue: this.segmentParams.endPoint,
    options: {
      floor: this.options.floor,
      ceil: this.options.ceil,
      vertical: this.options.vertical,
      minLimit: this.options.minLimit,
      maxLimit: this.options.maxLimit,
      step: this.options.step,
      showTicks: this.options.showTicks,
      showTicksValues: this.options.showTicksValues,
      disabled: this.options.disabled
    }
  };
}
/** #endSliderSettingsDialogBox methods */
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

export interface ISegmetParams {
  name?: string;
  startPoint: number;
  endPoint: number;
  minPossibleValue: number;
  maxPossibleValue: number;
}
