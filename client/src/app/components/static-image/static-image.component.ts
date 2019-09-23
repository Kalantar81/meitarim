import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SegmentParamsDialogComponent } from 'src/app/popboxes/segment-params-dialog/segment-params-dialog.component';
import { IStaticImageOptions, IImageStyle, SegmentParams, SelectAreaParams } from './static-image-interfaces';


@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit, OnChanges {
  @ViewChild('imageDiv', {static: true})
  public imageDiv: ElementRef<HTMLElement>;

  @ViewChild('selectAreaDiv', {static: true})
  public selectAreaDiv: ElementRef<HTMLElement>;

  @ViewChild('inlineDiv', {static: true})
  public inlineDiv: ElementRef<HTMLElement>;

  protected imageStyle: IImageStyle;
  protected segmentParams = new SegmentParams();
  protected selectAreaParams = new SelectAreaParams();

  private isMousDown: boolean = false;


  @Output()
  myOnAreaSelected:EventEmitter<SegmentParams> = new EventEmitter<SegmentParams>();

  @Output()
  myOncanplaythrough: EventEmitter<string> = new EventEmitter<string>();

  constructor( public dialog: MatDialog ) { }

  ngOnInit() {
    this.initSegmentParams_pr();
    this.initSelectedDiv_pr();
    // this.selectAreaDiv.nativeElement.hidden = true;
  }

  ngOnChanges() {}

  setOptions(options: IStaticImageOptions): void {
    this.imageDiv.nativeElement.style.background = 'url(' + options.src  + ') no-repeat center center';
    this.imageDiv.nativeElement.style.width = options.width + 'px';
    this.imageDiv.nativeElement.style.height = options.height + 'px';
    console.log('static image width: ' + document.getElementById('inlineDiv').clientWidth + ' static image height: ' + document.getElementById('inlineDiv').clientHeight);
    this.initImageDiv_pr();
  }

  private initImageDiv_pr(): void {
    this.imageDiv.nativeElement.style.display = 'inline-block';

    this.imageDiv.nativeElement.onmousedown = this.onMouseDown_pr.bind(this);
    this.imageDiv.nativeElement.onmousemove = this.onMouseMove_pr.bind(this);
    this.imageDiv.nativeElement.onmouseup = this.onMouseUp_pr.bind(this);
  }

  private initSegmentParams_pr(): void {
    this.segmentParams.startPointX = 0;
    this.segmentParams.startPointY = 0;
    this.segmentParams.endPointX = 0;
    this.segmentParams.endPointY = 0;
    this.segmentParams.createdBy = 'Dima';
    this.segmentParams.date = new Date();
  }

  private initSelectedDiv_pr(): void {
    this.selectAreaDiv.nativeElement.style.visibility = 'hidden' ;// = true;
    this.selectAreaDiv.nativeElement.style.border = '2px dotted white';
    this.selectAreaDiv.nativeElement.style.position = 'absolute';
  }

/** #startImageDiv methods */



  private onMouseDown_pr(e) {
    console.log('mouse down');
    this.isMousDown = true;
    this.selectAreaDiv.nativeElement.style.visibility = 'visible';// .hidden = false;
    // this.selectAreaParams.startPointX = e.offsetX + 200;
    // this.selectAreaParams.startPointY = e.offsetY + 35;
    this.selectAreaParams.startPointX = e.clientX;
    this.selectAreaParams.startPointY = e.clientY;

    this.segmentParams.startPointX = e.offsetX;
    this.segmentParams.startPointY = 750 - e.offsetY;

  }

  private onMouseMove_pr(e) {
    if (this.isMousDown ){
      if (
        (this.selectAreaParams.startPointX > e.clientX && this.selectAreaParams.startPointY > e.clientY)
         || (this.selectAreaParams.startPointX > e.clientX && this.selectAreaParams.startPointY < e.clientY)) {
          this.selectAreaParams.endPointX = e.clientX + 4;
          this.selectAreaParams.endPointY = e.clientY + 4;
      } else {
        this.selectAreaParams.endPointX = e.clientX;
        this.selectAreaParams.endPointY = e.clientY;
      }
      setTimeout(() => {this.reCalc_pr();}, 0);
    } else {
      console.log('mouse move isMousDown=false');
    }
  }

  private onMouseUp_pr(e) {
    this.isMousDown = false;
    const minPointX = Math.min(this.segmentParams.startPointX, e.offsetX);
    const maxPointX = Math.max(this.segmentParams.startPointX, e.offsetX);
    const minPointY = Math.min(this.segmentParams.startPointY, (750 - e.offsetY));
    const maxPointY = Math.max(this.segmentParams.startPointY, (750 - e.offsetY));

    this.segmentParams.startPointX = minPointX;
    this.segmentParams.endPointX = maxPointX;
    this.segmentParams.startPointY = minPointY;
    this.segmentParams.endPointY = maxPointY;

    this.selectAreaDiv.nativeElement.style.border = '4px solid white';
    this.openDialog();
    this.imageDiv.nativeElement.onmousemove = null;
  }

/** #endImageDiv methods */

  public mouseClickAngular() {
    // this.selectAreaDiv.nativeElement.style.background = '#006400';
    // this.selectAreaDiv.nativeElement.style.opacity = '0.3';

    this.isMousDown = false;
    this.selectAreaDiv.nativeElement.style.border = '4px solid white';

    this.imageDiv.nativeElement.onmousedown = null;
    this.imageDiv.nativeElement.onmousemove = null;
    this.imageDiv.nativeElement.onmouseup = null;

    this.openDialog();
  }

  private reCalc_pr() {


    const startPointX = Math.min(this.selectAreaParams.startPointX, this.selectAreaParams.endPointX);
    const endPointX = Math.max(this.selectAreaParams.startPointX, this.selectAreaParams.endPointX);
    const startPointY = Math.min(this.selectAreaParams.startPointY, this.selectAreaParams.endPointY);
    const endPointY = Math.max(this.selectAreaParams.startPointY, this.selectAreaParams.endPointY);

    this.selectAreaDiv.nativeElement.style.left = startPointX + 'px' ;
    this.selectAreaDiv.nativeElement.style.top = startPointY + 'px';
    this.selectAreaDiv.nativeElement.style.width = endPointX - startPointX + 'px';
    this.selectAreaDiv.nativeElement.style.height = endPointY - startPointY + 'px';

}


  /** #startDialogBox methods */
    public openDialog(): void {

      const dialogRef = this.dialog.open(
        SegmentParamsDialogComponent,
        {
          width: '600px',
          height: '550px',
          data: this.segmentParams
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed');
          this.segmentParams = result;
          this.myOnAreaSelected.emit(this.segmentParams);
        }

      });
    }

    public resetSelectedDiv(): void {
      this.initSegmentParams_pr();
      this.initImageDiv_pr();
      this.selectAreaDiv.nativeElement.style.border = '2px dotted white';
      this.selectAreaDiv.nativeElement.style.position = 'absolute';
      this.selectAreaDiv.nativeElement.style.width = '1px';
      this.selectAreaDiv.nativeElement.style.height = '1px';
      this.selectAreaDiv.nativeElement.style.top = '0px';
      this.selectAreaDiv.nativeElement.style.left = '0px';

      this.selectAreaParams.endPointX = 0;
      this.selectAreaParams.startPointX = 0;
      this.selectAreaParams.startPointY = 0;
      this.selectAreaParams.endPointY = 0 ;

      this.isMousDown = false;
    }
  /** #startDialogBox methods */

}


