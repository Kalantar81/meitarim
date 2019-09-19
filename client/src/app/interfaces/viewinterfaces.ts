'use strict';

import { StaticImageComponent } from '../components/static-image/static-image.component';
import { CustomImgComponent } from '../components/custom-img/custom-img.component';
import { CustomVideoComponent } from '../components/custom-video/custom-video.component';


export interface IVeiwWindow {
    dosImage: StaticImageComponent;
    arsImage: CustomImgComponent;
    artImage: CustomImgComponent;
    tdoImage: CustomImgComponent;
  
    arpVideo: CustomVideoComponent;
    tcsVideo: CustomVideoComponent;

    setCurrentDuration(curDuration:number):void;
    getCurrentDuration() : number;

    //currentTime: number;
    startPlay():void ;
    
    stopUpdateTimer():void;
    initItemsLoaded():void;

    hideSpinner():void;
    showSpinner():void;

    imgSliderChanged(value:number):void
    getCurrentTime():number;
}
