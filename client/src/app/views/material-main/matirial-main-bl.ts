import { IVeiwWindow } from 'src/app/interfaces/viewinterfaces';
import { Message, ChatService } from 'src/app/services/chat/chat.service';

export class ViewWindowBl  {
    
    private veiwWindow:IVeiwWindow;
    private chatService: ChatService;
    private itemsLoaded = 0;
    private ITEMS_TO_LOAD:number =6;
    private itemsCount:number = this.ITEMS_TO_LOAD;
    private currentDruation = 15;

    public message : Message = {
      clientId: "client1",
      fileId: "this is a test message",
      picDimensions:{
        x1:100,
        y1:101,
        x2:300,
        y2:500
      }
    };

    constructor(mainView:IVeiwWindow,chatService: ChatService){
      this.veiwWindow =   mainView;
      this.chatService = chatService;
      let handleMessage = this.handleMessageWs.bind(this);
      let handleError = this.onErrorWs.bind(this);
      chatService.messages.subscribe(handleMessage,handleError);
    }
    private filesArray:any[];
    public sendMsg() {
      console.log("send message ", this.message);
      this.filesArray = [];
      this.veiwWindow.initItemsLoaded();
      this.veiwWindow.currentTime = 0;
      //this.chatService.messages.next((this.message));
      this.veiwWindow.stopUpdateTimer();
      this.chatService.sendRequest(this.message);
      //this.message = " NEXT ONE";
    }

    public handleMessageWs(msg){
      //TODO
      //alert ("got message "+msg.fileName);
      //update this.filesArray[]
      console.log("Response from websocket: " + msg.fileName);
      this.filesArray.push(msg);
      this.updateFileData (msg);
      

      // if (this.filesArray.length == this.ITEMS_TO_LOAD){
      //   setTimeout(()=>{
      //     //TODO  run when it is loaded (ready)
          
      //     //this.veiwWindow.startPlay(); // starts automaticly
      //   },1000);
      //}
    }
  
    private updateFileData(fileDat:any):void{
      try {
        
        if (fileDat.fileName == "dos"){
          this.veiwWindow.dosImage.setOptions (
            {
              // end:  this._currentDruation,
              // start:  0,
              height:  750,
              width:  140,
              src: ChatService.SERVER_URL +  fileDat.filePath,
              // step:  1
            }
          );
        }
  
        if (fileDat.fileName == "tdo"){
          this.veiwWindow.tdoImage.setOptions(
            {
              end:  this.currentDruation,
              start:  0,
              height:  750,
              width:  140,
              src: ChatService.SERVER_URL +  fileDat.filePath,
              step:  1
            });
        }
        if (fileDat.fileName == "ars"){
          this.veiwWindow.arsImage.setOptions (
            {
              end:  this.currentDruation,
              start:  0,
              height:  500,
              width:  240,
              src: ChatService.SERVER_URL +  fileDat.filePath,
              step:  1
            }
          );
        }
  
        if (fileDat.fileName == "art"){
          this.veiwWindow.artImage.setOptions (
            {
              end: this.currentDruation,
              start: 0,
              height: 500,
              width: 240,
              src: ChatService.SERVER_URL +  fileDat.filePath,
              step: 1
            }
          );
        }
  
        if (fileDat.fileName == "arp"){
          this.veiwWindow.arpVideo.setOptions (
            {
              end: this.currentDruation,
              start: 0,
              height: 300,
              width: 400,
              src: ChatService.SERVER_URL +  fileDat.filePath,
              step: 1
            }
          );
        }
        
        if (fileDat.fileName == "tcs"){
          this.veiwWindow.tcsVideo.setOptions (
            {
              end: this.currentDruation,
              start: 0,
              height: 300,
              width: 400,
              src: ChatService.SERVER_URL +  fileDat.filePath,
              step: 1
            }
          );
        }
  
     } catch (e) {
        alert  (e.message);
      }
    }

    public onErrorWs(error){
       //TODO
      alert ("Error:" + error);
      console.log("Error from websocket: " + error);
    }
  
  
 
  
    public setVideo() {
     
  
    }
} 