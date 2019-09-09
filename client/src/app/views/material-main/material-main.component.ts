import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { CustomImgComponent } from 'src/app/components/custom-img/custom-img.component';
import { CustomVideoComponent } from 'src/app/components/custom-video/custom-video.component';
import { StaticImageComponent } from 'src/app/components/static-image/static-image.component';
import { ChatService, Message } from 'src/app/services/chat/chat.service';
import { IVeiwWindow } from 'src/app/interfaces/viewinterfaces';
import { ViewWindowBl } from './matirial-main-bl';

@Component({
  selector: 'app-material-main',
  templateUrl: './material-main.component.html',
  styleUrls: ['./material-main.component.less']
})
export class MaterialMainComponent implements OnInit, OnDestroy,IVeiwWindow {

  @ViewChild ('img1', {static:  false}) dosImage: StaticImageComponent;
  @ViewChild ('img2', {static:  false}) arsImage: CustomImgComponent;
  @ViewChild ('img3', {static:  false}) artImage: CustomImgComponent;
  @ViewChild ('tdoImage', {static:  false}) tdoImage: CustomImgComponent;

  @ViewChild ('video1', {static:  false}) arpVideo: CustomVideoComponent;
  @ViewChild ('video2', {static:  false}) tcsVideo: CustomVideoComponent;

  private _itemsLoaded: number = 0;
  private _itemsCount: number = ViewWindowBl.ITEMS_TO_LOAD;
  private _currentTime:  number = 0;
  private _currentDruation = 15;

  private myViewWindowBl : ViewWindowBl;

  public get currentTime(): number {
    return this._currentTime;
  }

  public initItemsLoaded(){
    this._itemsLoaded = 0;
  }

  @Input () public set currentTime(value: number) {
    this._currentTime = value;
  }

  constructor(private chatService: ChatService) {
    this.myViewWindowBl = new ViewWindowBl(this,chatService);
  }

  


  sendMsg() {
    this.myViewWindowBl.sendMsg();
  }

  ngOnInit() {
    this._mySpeed = 100;
    this._currentTime = 0;
  }

  public setVideo() {
    this.myViewWindowBl.setVideo();
  }


public startPlay() {
    this.arpVideo.play ();
    this.tcsVideo.play ();
    this.startUpdateTimer ();
}

  public stopUpdateTimer() {
      this.arpVideo.stop ();
      this.tcsVideo.stop ();
      this.stopTimer();
  }

  private _myTimer: any;
  private _mySpeed: number;

  imgSliderChanged(eventData){
    this.arpVideo.setCurrentPosition(eventData);
    this.tcsVideo.setCurrentPosition(eventData);
  }

  startUpdateTimer(): void {

    if  (this._myTimer === undefined) {
      this._myTimer = setInterval ( () => {

        // get video position
        const currentTime = this.arpVideo.myCurrentTime ();
        // console.log ('currentTime' + currentTime);
        if  (currentTime <= this._currentDruation) {
          // this.img1Component.sync (currentTime);
          this.tdoImage.sync(currentTime);
          this.arsImage.sync (currentTime);
          this.artImage.sync (currentTime);
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

  public setCurrentDuration(curDuration:number){
    this._currentDruation = curDuration;
  }
  public getCurrentDuration() : number{
    return this._currentDruation ;
  }
  
}
