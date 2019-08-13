import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { CustomImgComponent } from 'src/app/components/custom-img/custom-img.component';
import { CustomVideoComponent } from 'src/app/components/custom-video/custom-video.component';
import { StaticImageComponent } from 'src/app/components/static-image/static-image.component';

@Component({
  selector: 'app-material-main',
  templateUrl: './material-main.component.html',
  styleUrls: ['./material-main.component.less']
})
export class MaterialMainComponent implements OnInit, OnDestroy {

  @ViewChild ('img1', {static:  false}) img1Component: StaticImageComponent;
  @ViewChild ('img2', {static:  false}) img2Component: CustomImgComponent;
  @ViewChild ('img3', {static:  false}) img3Component: CustomImgComponent;
  @ViewChild ('tdoImage', {static:  false}) tdoImage: CustomImgComponent;

  @ViewChild ('video1', {static:  false}) video1Component: CustomVideoComponent;
  @ViewChild ('video2', {static:  false}) video2Component: CustomVideoComponent;

  private _itemsLoaded: number = 0;
  private _itemsCount: number = 0;
  private _currentTime:  number = 0;
  private _currentDruation = 15;

  public get currentTime(): number {
    return this._currentTime;
  }



  @Input () public set currentTime(value: number) {
    this._currentTime = value;
  }


  constructor() { }

  ngOnInit() {
    this._mySpeed = 100;
    this._currentTime = 1000;
  }

  public setVideo() {
    try {
      this._itemsLoaded = 0;
      this._itemsCount = 5;
      this.img1Component.setOptions (
        {
          end:  this._currentDruation,
          start:  0,
          height:  750,
          width:  140,
          src:  '/assets/pictures/dos.png',
          step:  1
        }
      );

      this.tdoImage.setOptions(
        {
          end:  this._currentDruation,
          start:  0,
          height:  750,
          width:  140,
          src:  '/assets/pictures/dos.png',
          step:  1
        });

      this.img2Component.setOptions (
        {
          end:  this._currentDruation,
          start:  0,
          height:  500,
          width:  240,
          src:  '/assets/pictures/ars.png',
          step:  1
        }
      );

      this.img3Component.setOptions (
        {
          end: this._currentDruation,
          start: 0,
          height: 500,
          width: 240,
          src: '/assets/pictures/ars.png',
          step: 1
        }
      );

      this.video1Component.setOptions (
        {
          end: this._currentDruation,
          start: 0,
          height: 300,
          width: 400,
          src: '/assets/moovies/arp.mp4',
          step: 1
        }
      );
      this.video2Component.setOptions (
          {
            end: this._currentDruation,
            start: 0,
            height: 300,
            width: 400,
            src: '/assets/moovies/arp.mp4',
            step: 1
          }
        );

   } catch (e) {
      alert  (e.message);
    }

  }


public startPlay() {
    this.video1Component.play ();
    this.video2Component.play ();
    this.startUpdateTimer ();
}
  public stopUpdateTimer() {
      this.video1Component.stop ();
      this.video2Component.stop ();
      this.stopTimer();
  }

  private _myTimer: any;
  private _mySpeed: number;

  startUpdateTimer(): void {

    if  (this._myTimer === undefined) {
      this._myTimer = setInterval ( () => {

        // get video position
        const currentTime = this.video1Component.myCuurentTime ();
        // console.log ('currentTime' + currentTime);
        if  (currentTime <= this._currentDruation) {
          this.img1Component.sync (currentTime);
          this.tdoImage.sync(currentTime);
          this.img2Component.sync (currentTime);
          this.img3Component.sync (currentTime);
        } else {
          this.stopTimer ();
        }
      },  this._mySpeed);
    }
  }

  stopTimer(): void {
    if  (this._myTimer) {
      clearInterval (this._myTimer);
      this._myTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer ();
  }

  public mediaLoaded() {
    this._itemsLoaded ++;
    if (this._itemsLoaded >= this._itemsCount) {
      this.startPlay ();
    }
  }

}
