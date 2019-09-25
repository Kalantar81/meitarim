import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SegmentParamsDialogComponent } from 'src/app/popboxes/segment-params-dialog/segment-params-dialog.component';
import { IStaticImageOptions, IImageStyle, SegmentParams, SelectAreaParams } from './static-image-interfaces';


@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.css']
})

export class StaticImageComponent implements OnInit {
  @ViewChild('imageDiv', {static: true})
  public imageDiv: ElementRef<HTMLElement>;

  @ViewChild('selectAreaDiv', {static: true})
  public selectAreaDiv: ElementRef<HTMLElement>;

  @ViewChild('inlineDiv', {static: true})
  public inlineDiv: ElementRef<HTMLElement>;

  public closeSelectedAreaDivIndicator = false;

  private _imageStyle: IImageStyle;
  private _segmentParams = new SegmentParams();
  private _selectAreaParams = new SelectAreaParams();

  private _isMousDown = false;


  @Output()
  myOnAreaSelected: EventEmitter<SegmentParams> = new EventEmitter<SegmentParams>();

  @Output()
  myOncanplaythrough: EventEmitter<string> = new EventEmitter<string>();

  constructor( public dialog: MatDialog ) { }

  //#region of public methods
    ngOnInit() {
      this._initSegmentParams();
      this._initSelectedAreaDiv();
      // this.selectAreaDiv.nativeElement.hidden = true;
    }

    setOptions(options: IStaticImageOptions): void {
      this.imageDiv.nativeElement.style.background = 'url(' + options.src  + ') no-repeat center center';
      this.imageDiv.nativeElement.style.width = options.width + 'px';
      this.imageDiv.nativeElement.style.height = options.height + 'px';
      console.log('static image width: ' + document.getElementById('inlineDiv').clientWidth + ' static image height: ' + document.getElementById('inlineDiv').clientHeight);
      this._initImageDiv();
    }

    /** Inits all mouse events of imageDiv
     * reset all params of _selectAreaParams and _segmentParams objects
     * reset to default settings an areaSelectedDiv
     */
    public resetSelectedDiv(): void {
      this._initSegmentParams();
      this._initImageDiv();
      this._initSelectAreaDiv();

      this._selectAreaParams.endPointX = 0;
      this._selectAreaParams.startPointX = 0;
      this._selectAreaParams.startPointY = 0;
      this._selectAreaParams.endPointY = 0 ;

      this._isMousDown = false;
      this.closeSelectedAreaDivIndicator = false;
    }

    public dbClickOnSelectedDiv(): void {
      if (!this.closeSelectedAreaDivIndicator) {
        this.closeSelectedAreaDivIndicator = true;
        this._isMousDown = false;
        this.selectAreaDiv.nativeElement.style.border = '4px solid white';
        this._nullifyImageDivEvents();
      }

      // if() {}
      this.openDialog();
    }

  //#endregion of public methods

  //#region of private methods

    /** connects mouse events to image div */
    private _initImageDiv(): void {
      this.imageDiv.nativeElement.style.display = 'inline-block';
      this.imageDiv.nativeElement.onmousedown = this._onMouseDown.bind(this);
      this.imageDiv.nativeElement.onmousemove = this._onMouseMove.bind(this);
      this.imageDiv.nativeElement.onmouseup = this._onMouseUp.bind(this);
    }

    /** Initialisation or reinitialisation of segment params of selected area */
    private _initSegmentParams(): void {
      this._segmentParams.startPointX = 0;
      this._segmentParams.startPointY = 0;
      this._segmentParams.endPointX = 0;
      this._segmentParams.endPointY = 0;
      this._segmentParams.firstTimeOpened = true;
      this._segmentParams.createdBy = 'Dima';
      this._segmentParams.date = new Date();
    }

    /** Gives a default definitions to selectArea div. The div that choose a specific segment from image */
    private _initSelectedAreaDiv(): void {
      this.selectAreaDiv.nativeElement.style.visibility = 'hidden' ;
      this.selectAreaDiv.nativeElement.style.border = '2px dotted white';
      this.selectAreaDiv.nativeElement.style.position = 'absolute';
    }

    /** Checks if mouseDown event was activated, gives to end points (x, y) of selectedDiv params of mouse location */
    private _onMouseMove(e) {
      if (this._isMousDown ) {
        if (
          (this._selectAreaParams.startPointX > e.clientX && this._selectAreaParams.startPointY > e.clientY)
          || (this._selectAreaParams.startPointX > e.clientX && this._selectAreaParams.startPointY < e.clientY)) {
            this._selectAreaParams.endPointX = e.clientX + 4;
            this._selectAreaParams.endPointY = e.clientY + 4;
        } else {
          this._selectAreaParams.endPointX = e.clientX;
          this._selectAreaParams.endPointY = e.clientY;
        }
        setTimeout(() => {this.reCalc_pr();}, 0);
      } else {
        console.log('mouse move isMousDown=false');
      }
    }

    /** Make a selectAreaDiv visible. Gives to selectAreaDiv start points (x, y) coordinates on the place, where the mouse was clicked */
    private _onMouseDown(e) {
      console.log('mouse down');
      this._isMousDown = true;
      this.selectAreaDiv.nativeElement.style.visibility = 'visible';
      this._selectAreaParams.startPointX = e.clientX;
      this._selectAreaParams.startPointY = e.clientY;

      this._segmentParams.startPointX = e.offsetX;
      this._segmentParams.startPointY = 750 - e.offsetY;

    }

    /** Fix selectedDiv on the image.
     * Neutralize all image events.
     * Open dialog/popup with selected params.
     */
    private _onMouseUp(e) {
      this.closeSelectedAreaDivIndicator = true;
      this._isMousDown = false;

      const minPointX = Math.min(this._segmentParams.startPointX, e.offsetX);
      const maxPointX = Math.max(this._segmentParams.startPointX, e.offsetX);
      const minPointY = Math.min(this._segmentParams.startPointY, (750 - e.offsetY));
      const maxPointY = Math.max(this._segmentParams.startPointY, (750 - e.offsetY));

      /** x, y params (time, frequency) for dialog */
      this._segmentParams.startPointX = minPointX;
      this._segmentParams.endPointX = maxPointX;
      this._segmentParams.startPointY = minPointY;
      this._segmentParams.endPointY = maxPointY;

      /** draws a selectedDiv as solid line */
      this.selectAreaDiv.nativeElement.style.border = '4px solid white';
      /** Open a dialog/popbox */
      this.openDialog();
      /** Neutralize imageDiv events */
      this._nullifyImageDivEvents();
    }

    /** Neutralize imageDiv events */
    private _nullifyImageDivEvents(): void {
      this.imageDiv.nativeElement.onmousemove = null;
      this.imageDiv.nativeElement.onmousedown = null;
      this.imageDiv.nativeElement.onmouseup = null;
    }

    /** Draws selected div and redraw it with every mousemove */
    private reCalc_pr() {
      const startPointX = Math.min(this._selectAreaParams.startPointX, this._selectAreaParams.endPointX);
      const endPointX = Math.max(this._selectAreaParams.startPointX, this._selectAreaParams.endPointX);
      const startPointY = Math.min(this._selectAreaParams.startPointY, this._selectAreaParams.endPointY);
      const endPointY = Math.max(this._selectAreaParams.startPointY, this._selectAreaParams.endPointY);

      this.selectAreaDiv.nativeElement.style.left = startPointX + 'px' ;
      this.selectAreaDiv.nativeElement.style.top = startPointY + 'px';
      this.selectAreaDiv.nativeElement.style.width = endPointX - startPointX + 'px';
      this.selectAreaDiv.nativeElement.style.height = endPointY - startPointY + 'px';

  }

  /** initialise selectAreaDiv and gives to it a default values */
  private _initSelectAreaDiv(): void {
    this.selectAreaDiv.nativeElement.style.border = '2px dotted white';
    this.selectAreaDiv.nativeElement.style.position = 'absolute';
    this.selectAreaDiv.nativeElement.style.width = '1px';
    this.selectAreaDiv.nativeElement.style.height = '1px';
    this.selectAreaDiv.nativeElement.style.top = '0px';
    this.selectAreaDiv.nativeElement.style.left = '0px';
  }

//#endregion of private methods */

  //#region DialogBox methods
    public openDialog(): void {

      const dialogRef = this.dialog.open(
        SegmentParamsDialogComponent,
        {
          width: '600px',
          height: '550px',
          data: this._segmentParams
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed');
          this._segmentParams = result;
          this.myOnAreaSelected.emit(this._segmentParams);
        }

      });
    }
  //#region DialogBox methods

}


