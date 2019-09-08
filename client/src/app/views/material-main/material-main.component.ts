import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { CustomImgComponent } from 'src/app/components/custom-img/custom-img.component';
import { CustomVideoComponent } from 'src/app/components/custom-video/custom-video.component';
import { StaticImageComponent } from 'src/app/components/static-image/static-image.component';
import { ChatService, Message } from 'src/app/services/chat/chat.service';
import { IMainVeiw } from 'src/app/interfaces/viewinterfaces';

@Component({
  selector: 'app-material-main',
  templateUrl: './material-main.component.html',
  styleUrls: ['./material-main.component.less']
})
export class MaterialMainComponent implements OnInit, OnDestroy,IMainVeiw {

  @ViewChild ('img1', {static:  false}) dosImage: StaticImageComponent;
  @ViewChild ('img2', {static:  false}) arsImage: CustomImgComponent;
  @ViewChild ('img3', {static:  false}) artImage: CustomImgComponent;
  @ViewChild ('tdoImage', {static:  false}) tdoImage: CustomImgComponent;

  @ViewChild ('video1', {static:  false}) arpVideo: CustomVideoComponent;
  @ViewChild ('video2', {static:  false}) tcsVideo: CustomVideoComponent;

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




  constructor(private chatService: ChatService) {
    
    let handleMessage = this.handleMessageWs.bind(this);
    let handleError = this.onErrorWs.bind(this);
    chatService.messages.subscribe(handleMessage,handleError);
  }

  private handleMessageWs(msg){
    //TODO
    alert ("got message "+msg);
    //update this.filesArray[]
    console.log("Response from websocket: " + msg);
  }

  private onErrorWs(error){
     //TODO
    alert ("Error:" + error);
    console.log("Error from websocket: " + error);
  }


  private message : Message = {
    clientId: "client1",
    fileId: "this is a test message",
    picDimensions:{
      x1:100,
      y1:101,
      x2:300,
      y2:500
    }
  };


  private filesArray:any[];

  sendMsg() {
    console.log("send message ", this.message);
    this.filesArray = [];
    this.chatService.messages.next((this.message));
    //this.message = " NEXT ONE";
  }

  ngOnInit() {
    this._mySpeed = 100;
    this._currentTime = 1000;
  }

  public setVideo() {
    try {
      this._itemsLoaded = 0;
      this._itemsCount = 5;
      this.dosImage.setOptions (
        {
          // end:  this._currentDruation,
          // start:  0,
          height:  750,
          width:  140,
          src:  '/assets/pictures/dos.png',
          // step:  1
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

      this.arsImage.setOptions (
        {
          end:  this._currentDruation,
          start:  0,
          height:  500,
          width:  240,
          src:  '/assets/pictures/ars.png',
          step:  1
        }
      );

      this.artImage.setOptions (
        {
          end: this._currentDruation,
          start: 0,
          height: 500,
          width: 240,
          src: '/assets/pictures/ars.png',
          step: 1
        }
      );

      this.arpVideo.setOptions (
        {
          end: this._currentDruation,
          start: 0,
          height: 300,
          width: 400,
          src: '/assets/moovies/arp.mp4',
          step: 1
        }
      );
      this.tcsVideo.setOptions (
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

}
