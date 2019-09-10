import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { IPlayableMedia, IPlayableMediaOptions } from 'src/app/interfaces/mediainterfaces';

@Component({
  selector: 'app-custom-video',
  templateUrl: './custom-video.component.html',
  styleUrls: ['./custom-video.component.css']
})
export class CustomVideoComponent implements OnInit,IPlayableMedia {



  private _myOptions:IPlayableMediaOptions;
  protected _mysSrc : any;
  protected _myWidth: string;
  protected _myHeight: string;
  protected _myIsEnabledToPlay: boolean;

  @Output()
  myOncanplaythrough:EventEmitter<string> = new EventEmitter();

  public isEnabledToPlay(){
    return this._myIsEnabledToPlay;
  }

  public play(): void {
    this.videoPlayer.play();
  }
  public stop(): void {
    this.videoPlayer.pause();
  }

  private _oncanplaythroughInit:boolean = false;

  public setOptions(option: IPlayableMediaOptions): void {
    this._myOptions = option;
    this.myWidth =  this._myOptions.width + "px";
    this.myHeight =  this._myOptions.height + "px";

    var newSrc =this._myOptions.src// URL.createObjectURL(this._myOptions.src); // IE10+
    // Video is now downloaded
    // and we can set it as source on the video element
    if (!this.mySrc) this.videoPlayer.pause();
    this.mySrc = newSrc;// this._myOptions.src;
    this.videoPlayer.src = newSrc;
    this.videoPlayer.load();
    console.log ("setOptions: Video " + this._myOptions.src  + " can play" );
    //this.oncanplaythroughLocal(null);
    //this.videoPlayer.addEventListener ("oncanplaythrough",this.oncanplaythroughLocal)
    //this.videoPlayer.addEventListener("oncanplaythrough",this.oncanplaythroughLocal)
    //
    if (!this._oncanplaythroughInit)
      this.videoPlayer.oncanplaythrough=this.oncanplaythroughLocal.bind(this);
  }

  public oncanplaythroughLocal(event){
    console.log ("oncanplaythroughLocal: Video " + this._myOptions.src  + " can play" );
    this._myIsEnabledToPlay = true;
    this.myOncanplaythrough.emit(this.mySrc);
  }



  public getOptions():IPlayableMediaOptions {
    return this._myOptions;
  }
  public setCurrentPosition(position: number): void {
    if (this._myIsEnabledToPlay==true){
      this.videoPlayer.currentTime = position;
    }else{
      console.log("setCurrentPosition is diabled for " + this._mysSrc );
    }
  }

  constructor() { 
    this._myIsEnabledToPlay = false;
    //this.mySrc = "/assets/moovies/popcorntest.mp4";
  }
  
  
  public get mySrc(){
      return this._mysSrc;
  }

  @Input() public set mySrc(p_value){
    this._mysSrc = p_value;
  }

  @Input() public set myWidth(p_value){
    this._myWidth = p_value;
  }

  public get myWidth(){
    return this._myWidth;
  }

  @Input() public set myHeight(p_value){
    this._myHeight = p_value;
  }
  public get myHeight(){
    return this._myHeight;
  }


  videoPlayer: HTMLVideoElement;

  @ViewChild("videoPlayer",{static: false})  
  set mainVideoEl(el: ElementRef) {
        this.videoPlayer = el.nativeElement;
  }

  toggleVideo(event: any) {
    this.videoPlayer.play();
  }

  public myCurrentTime():number{
    return this.videoPlayer.currentTime;
  }

  ngOnInit() {
    
  }

}
