import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit, OnChanges {

  protected imageStyle: IImageStyle;


  @Output()
  myOncanplaythrough: EventEmitter<string> = new EventEmitter<string>();

  constructor( public dialog: MatDialog ) { }

  ngOnInit() {}

  ngOnChanges() {}

  setOptions(options: IStaticImageOptions): void {
    this.imageStyle = {
      display: 'inline-block',
      background: 'url(' + options.src  + ') no-repeat center center',
      width: options.width + 'px',
      height: options.height + 'px'
    };
  }

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

