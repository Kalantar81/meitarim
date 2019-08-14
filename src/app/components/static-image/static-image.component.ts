import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IPlayableMedia, IPlayableMediaOptions } from 'src/app/interfaces/mediainterfaces';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Options } from 'ng5-slider';
import { SegmentParamsDialogComponent } from 'src/app/popboxes/segment-params-dialog/segment-params-dialog.component';

@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit {

  protected verticalSlider: RangeSliderModel;
  protected segmentParams: ISegmetParams;
  protected imageStyle: IImageStyle;
  protected sliderHeight: string;


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
        console.log('The dialog was closed');
        this.segmentParams = result;
        this.changeVerticalSliderParams();
        alert( ' חתך בשם ' + this.segmentParams.name + ' נשלח לשרת ');
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
