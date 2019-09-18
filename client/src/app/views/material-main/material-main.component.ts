import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { CustomImgComponent } from 'src/app/components/custom-img/custom-img.component';
import { CustomVideoComponent } from 'src/app/components/custom-video/custom-video.component';
import { StaticImageComponent } from 'src/app/components/static-image/static-image.component';
import { ChatService, Message } from 'src/app/services/websocket-chat/chat.service';
import { IVeiwWindow } from 'src/app/interfaces/viewinterfaces';
import { ViewWindowBl } from './matirial-main-bl';
import { SegmentParams } from 'src/app/components/static-image/static-image-interfaces';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFileUploaderComponent } from "angular-file-uploader";
import { ServerProxyService } from 'src/app/services/server-proxy/server-proxy.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadDialogComponent } from 'src/app/popboxes/upload-dialog/upload-dialog.component';
import { DataStoreService } from 'src/app/services/data-store/data-store.service';
import { AppMessagesService } from 'src/app/services/app-messages/app-messages.service';

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
  private _itemsCount: number = ViewWindowBl.ITEMS_TO_LOAD_DYNAMIC_COMPONENTS ;//check only 2 videos and ars art images ViewWindowBl.ITEMS_TO_LOAD;
  //private _currentTime:  number = 0;
  private _currentDruation = 15;


  private _progressColor = "primary"; //primary,accent,warn
  private _progressMode = "indeterminate";//determinate,indeterminate
  private _progressValue = 20;

  public get progressColor(){
    return this._progressColor;
  }

  @Input() public set progressColor(p_value){
    this._progressColor = p_value;
  }

  public get progressMode(){
    return this._progressMode;
  }

  @Input() public set progressMode(p_value){
  this._progressMode = p_value;
  }

  public get progressValue(){
    return this._progressValue;
  }

  @Input() public set progressValue(p_value){
  this._progressValue = p_value;
  }


  private myViewWindowBl : ViewWindowBl;

  // public get currentTime(): number {
  //   return this._currentTime;
  // }

  public initItemsLoaded(){
    this._itemsLoaded = 0;
    this._itemsCount = ViewWindowBl.ITEMS_TO_LOAD_DYNAMIC_COMPONENTS;

  }

  // @Input () public set currentTime(value: number) {
  //   this._currentTime = value;
  // }

  constructor(private chatService: ChatService,
    private ngxSpinnerService:NgxSpinnerService,
    private serverProxyService: ServerProxyService,
    private dialog: MatDialog,
    private dataStoreService:DataStoreService,
    private appMessagesService:AppMessagesService) {
    this.myViewWindowBl = new ViewWindowBl(this,chatService,dataStoreService,appMessagesService);

  }

  //filesList:String[] = [];
  /*
  Get list of availible files on the server
  */
  getFilesList(){
    this.serverProxyService.getData(ChatService.GET_FILES_LIST)
      .subscribe(
        (data: any) =>  {
          console.log(data)
          this.dataStoreService.clearList();
          if (data!=undefined && data.files!=undefined && data.files.length>0){
            data.files.forEach((item)=>{
              this.dataStoreService.addFile(item);
            })
          }
       
          //alert ("ok") ;
        }
       );
  }

  setFile(fileName:string){
    var segmentParams:SegmentParams = new SegmentParams();
    segmentParams.fileName = fileName;
    this.selectionAreaChanged (segmentParams);
  }

  public hideSpinner(){
    this.ngxSpinnerService.hide();
  }

  public showSpinner(){
    this.ngxSpinnerService.show();
  }



  ngOnInit() {
    //this._mySpeed = 1000;
    //this._currentTime = 0;
    // this.fileUpload1.ngOnInit = (item) => {
    //   item.withCredentials = false;
    // }
    //this.fileUpload1.
    this.getFilesList();
  }

  
  public setVideo() {
    this.myViewWindowBl.setVideo();
  }

private _startPlayTrials : number =0;

public startPlay() {
    if (this.arpVideo.isEnabledToPlay() && this.tcsVideo.isEnabledToPlay()){
      this._startPlayTrials = 0;
      setTimeout( ()=>{
        this.arpVideo.play ();
        this.tcsVideo.play ();
        this.startUpdateTimer ();
      },100);
    }else{
      if (this._startPlayTrials<10){
        this._startPlayTrials ++;
        setTimeout( ()=>{
          this.startPlay();
        },100);
      }else{
        this._startPlayTrials = 0;
        alert ("תקלה בהפעלת קבצי וידאו, נא לנסות להטעין אותם מחדש");
      }
    }
}

  public stopUpdateTimer() {
      this.arpVideo.stop ();
      this.tcsVideo.stop ();
      this.stopTimer();
  }

  private _myTimer: any;
  private _mySpeed: number = 50;

  imgSliderChanged(eventData){
    var newTime = parseFloat(eventData)
    console.log ('imgSliderChanged: slider -> set vidio time:' + eventData);
    this.stopUpdateTimer();
    //this._itemsCount = 2;
    //this._itemsLoaded =0;
    this.arpVideo.setCurrentPosition(newTime);
    this.tcsVideo.setCurrentPosition(newTime);
    this.arsImage.sync (newTime);
    this.artImage.sync (newTime);
  }

  startUpdateTimer(): void {

    if  (this._myTimer === undefined) {
      this._myTimer = setInterval ( () => {

        // get video position
        const currentTime = this.arpVideo.myCurrentTime ();
        //console.log ('startUpdateTimer: currentTime' + currentTime);

        if  (currentTime <= this._currentDruation) {
          // this.img1Component.sync (currentTime);
          //this.tdoImage.sync(currentTime);
          this.arsImage.sync (currentTime);
          this.artImage.sync (currentTime);
          if (currentTime==this._currentDruation){
            this.stopTimer ();
          }
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
    console.log ('mediaLoaded: Media loaded _itemsLoaded=' + this._itemsLoaded);
    if (this._itemsLoaded == this._itemsCount) {
      console.log ("mediaLoaded: startPlay()")
      this.hideSpinner();
      this.startPlay ();
    }
  }

  public setCurrentDuration(curDuration:number){
    this._currentDruation = curDuration;
  }
  public getCurrentDuration() : number{
    return this._currentDruation ;
  }

  public selectionAreaChanged (area:SegmentParams){
    this.myViewWindowBl.changeSelectionArea(area);
    //alert( ' חתך בשם ' + area.segmentName + ' נשלח לשרת ');
  }


 
}
