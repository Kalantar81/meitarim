'use strict';

import { EventEmitter } from '@angular/core';


export interface IPlayableMediaOptions{
    start:number;
    end:number;
    step:number;
    src:string;
    width:number;
    height:number;
    name:String;
}

export interface IPlayableMedia {
    setOptions(option: IPlayableMediaOptions):void;
    getOptions():IPlayableMediaOptions;
    setCurrentPosition(position:number):void;

}
