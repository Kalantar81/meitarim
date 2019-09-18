import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators'
import { Subject } from "rxjs/Rx";
import { FileData } from '../data-store/data-store.service';


export interface FileMessage {
  file: FileData;
}


@Injectable({
  providedIn: 'root'
})
export class AppMessagesService {

  constructor() { }

  //myFileMessage - Subject to set current selected file
  private myFileMessage: Subject<FileMessage> = new Subject<FileMessage>();
   //myFileDemoMessage - Subject to set current selected file to DEMO 
  private myFileDemoMessage: Subject<FileMessage> = new Subject<FileMessage>();
  
  public get fileMessage(): Subject<FileMessage> {
    return this.myFileMessage;
  }

  public set fileMessage(value: Subject<FileMessage>) {
    this.myFileMessage = value;
  }

  public get fileDemoMessage(): Subject<FileMessage> {
    return this.myFileDemoMessage;
  }

  public set fileDemoMessage(value: Subject<FileMessage>) {
    this.myFileDemoMessage = value;
  }

  public sendFileMessage(fileMessage: FileMessage){
    try{
      this.myFileMessage.next(fileMessage);
    }
    catch(ex){
        console.log(ex)
        alert ("System error:" + ex.message);
    }
  }

  public sendFileDemoMessage(fileMessage: FileMessage){
    try{
      this.myFileDemoMessage.next(fileMessage);
    }
    catch(ex){
        console.log(ex)
        alert ("System error:" + ex.message);
    }
  }

}
