import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "../websocket/websocket.service"
import * as Rx from 'rxjs/Rx';
import { CATCH_STACK_VAR } from '@angular/compiler/src/output/output_ast';



export interface ErrorMessage{
  errorDesc:string
}

export interface Message {
  clientId:string,
  sourceFileName: string,
  picDimensions:{
    freq1:number,
    time1:number,
    freq2:number,
    time2:number
  },
  file?:any,
  error?:any
}


@Injectable()
export class ChatService {
  public static  SERVER_URL = "http://127.0.0.1:8080/getfile?fileName=";
  public static CHAT_URL = "ws://127.0.0.1:8080/mediaChat";
  public static UPLOAD_URL = "http://127.0.0.1:8080/upload";
  public static GET_FILES_LIST = "http://127.0.0.1:8080/getData?op=getFilesList"
  public get messages(): Subject<Message> {
    return this.myMessages;
  }

  public set messages(value: Subject<Message>) {
    this.myMessages = value;
  }

  private myMessages: Subject<Message>;


  private myWebSocketSMessages: Subject<Message>;

  private wsService:WebsocketService;

  constructor(wsService: WebsocketService) {
    this.wsService = wsService;
    this.myMessages = new  Subject<Message>();

    this.createNewSocket();
  }

  private createNewSocket(){
    this.myWebSocketSMessages = <Subject<Message>>this.wsService.connect(ChatService.CHAT_URL).map(
      (response: MessageEvent): Message => {
        console.log(response.data)
        let data = JSON.parse(response.data);
        return data;
      }
      
    );

    this.myWebSocketSMessages.subscribe({
      complete:() =>{
        //console.log("observer completed ");
      },
      next: (m) =>{
        //console.log("observer: ${v}");
        this.myMessages.next(m);
      },
      error:(err) =>{
        console.log("observer error ");
        this.myMessages.error(err)
      }
    });

  }

  public sendRequest(msg: Message,isRetry?:boolean){
    try{
      this.myWebSocketSMessages.next(msg);
    }
    catch(ex){
       if (!isRetry){
        this.createNewSocket()
         setTimeout(()=>{
          this.sendRequest(msg,true)
         },1500)
       }else{
        alert ("Error while connecting to the server. Please try again later.");
       }
    }
  }

  ///next: (value: Message) => void;
  //error: (err: any) => void;
  //complete: () => void;
  

   
}