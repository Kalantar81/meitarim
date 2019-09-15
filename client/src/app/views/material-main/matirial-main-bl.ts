import { IVeiwWindow } from 'src/app/interfaces/viewinterfaces';
import { Message, ChatService } from 'src/app/services/chat/chat.service';
import { SegmentParams } from 'src/app/components/static-image/static-image-interfaces';

export class ViewWindowBl  {
    
    private veiwWindow:IVeiwWindow;
    private chatService: ChatService;
    private itemsLoaded = 0;
    public static ITEMS_TO_LOAD:number =6;
    public static ITEMS_TO_LOAD_DYNAMIC_COMPONENTS:number =4;
    private itemsCount:number = ViewWindowBl.ITEMS_TO_LOAD;
    private currentDruation = 15;
    private currentWorkingFile:string;
    //private filesArray:any[];

   

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
    
    

    private  createMessageBySelectedArea(selectedArea:SegmentParams):Message{
       var newMsg:Message = {
        clientId: "max",
        fileId: "this is a test message",
        picDimensions:{
          x1:selectedArea.startPointX,
          y1:selectedArea.startPointY,
          x2:selectedArea.endPointX,
          y2:selectedArea.endPointY
        }
       } 

       return newMsg;
    }

     
    public changeSelectionArea(selectedArea:SegmentParams){
      console.log("changeSelectionArea ", selectedArea);
      //this.filesArray = [];
      this.veiwWindow.initItemsLoaded();
      this.veiwWindow.stopUpdateTimer();
      if (selectedArea.fileName == undefined){
        selectedArea.fileName = this.currentWorkingFile;
      }else{
        this.currentWorkingFile = selectedArea.fileName;
      }
      var newMsg = this.createMessageBySelectedArea(selectedArea);
      this.veiwWindow.showSpinner();
      this.chatService.sendRequest(this.message);
    }

    public sendMsg() {
      console.log("send message ", this.message);
      //this.filesArray = [];
      this.veiwWindow.initItemsLoaded();
      //this.veiwWindow.currentTime = 0;
      //this.chatService.messages.next((this.message));
      
      this.chatService.sendRequest(this.message);
      //this.message = " NEXT ONE";
    }

    public handleMessageWs(msg){
      //TODO
      //alert ("got message "+msg.fileName);
      //update this.filesArray[]
      //setTimeout(()=>{

      console.log("handleMessageWs: update file:" + JSON.stringify(msg))
      //this.filesArray.push(msg);
      this.updateFileData (msg);
      
      //},10);

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
              step:  1,
              name: "tdo"
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
              step:  1,
              name: "ars"
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
              step: 1,
              name: "art"
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
              step: 1,
              name: "arp"
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
              step: 1,
              name: "tcs"
            }
          );
        }
  
     } catch (e) {
        alert  (e.message);
      }
    }

    public onErrorWs(error){
       //TODO
      this.veiwWindow.hideSpinner();
      console.log("Error while connecting to the server: " + error.target.url);
      alert ("Error while connecting to the server: " + error.target.url);
     
    }
  
  
 
  
    public setVideo() {
      try {
        this.veiwWindow.initItemsLoaded();
        //this.itemsCount =  this.ITEMS_TO_LOAD;
        this.veiwWindow.dosImage.setOptions (
          {
            // end:  this._currentDruation,
            // start:  0,
            height:  750,
            width:  140,
            src:  '/assets/pictures/dos.png',
            // step:  1
          }
        );
  
        this.veiwWindow.tdoImage.setOptions(
          {
            end:  this.currentDruation,
            start:  0,
            height:  750,
            width:  140,
            src:  '/assets/pictures/dos.png',
            step:  1,
            name: "dos"
          });
  
        this.veiwWindow.arsImage.setOptions (
          {
            end:  this.currentDruation,
            start:  0,
            height:  500,
            width:  240,
            src:  '/assets/pictures/ars.png',
            step:  1,
            name: "ars"
          }
        );
  
        this.veiwWindow.artImage.setOptions (
          {
            end: this.currentDruation,
            start: 0,
            height: 500,
            width: 240,
            src: '/assets/pictures/ars.png',
            step: 1,
            name: "ars"
          }
        );
  
        this.veiwWindow.arpVideo.setOptions (
          {
            end: this.currentDruation,
            start: 0,
            height: 300,
            width: 400,
            src: '/assets/moovies/arp.mp4',
            step: 1,
            name: "arp1"
          }
        );
        this.veiwWindow.tcsVideo.setOptions (
            {
              end: this.currentDruation,
              start: 0,
              height: 300,
              width: 400,
              src: '/assets/moovies/arp.mp4',
              step: 1,
              name: "arp2"
            }
          );
  
     } catch (e) {
        alert  (e.message);
      }
  
    }

    // public setVideoFromServer() {
    //   try {
    //     this.veiwWindow.initItemsLoaded();
    //     //this.itemsCount =  this.ITEMS_TO_LOAD;
    //     this.veiwWindow.dosImage.setOptions (
    //       {
    //         // end:  this._currentDruation,
    //         // start:  0,
    //         height:  750,
    //         width:  140,
    //         src:  'http://127.0.0.1:8080/getfile?fileName=dos.png',
    //         // step:  1
    //       }
    //     );
  
    //     this.veiwWindow.tdoImage.setOptions(
    //       {
    //         end:  this.currentDruation,
    //         start:  0,
    //         height:  750,
    //         width:  140,
    //         src:  'http://127.0.0.1:8080/getfile?fileName=dos.png',
    //         step:  1,
    //         name: "dos"
    //       });
  
    //     this.veiwWindow.arsImage.setOptions (
    //       {
    //         end:  this.currentDruation,
    //         start:  0,
    //         height:  500,
    //         width:  240,
    //         src:  'http://127.0.0.1:8080/getfile?fileName=ars.png',
    //         step:  1,
    //         name: "ars"
    //       }
    //     );
  
    //     this.veiwWindow.artImage.setOptions (
    //       {
    //         end: this.currentDruation,
    //         start: 0,
    //         height: 500,
    //         width: 240,
    //         src: 'http://127.0.0.1:8080/getfile?fileName=ars.png',
    //         step: 1,
    //         name: "ars"
    //       }
    //     );
  
    //     this.veiwWindow.arpVideo.setOptions (
    //       {
    //         end: this.currentDruation,
    //         start: 0,
    //         height: 300,
    //         width: 400,
    //         src: 'http://127.0.0.1:8080/getfile?fileName=arp.mp4',
    //         step: 1,
    //         name: "arp1"
    //       }
    //     );
    //     this.veiwWindow.tcsVideo.setOptions (
    //         {
    //           end: this.currentDruation,
    //           start: 0,
    //           height: 300,
    //           width: 400,
    //           src: 'http://127.0.0.1:8080/getfile?fileName=tcs.mp4',
    //           step: 1,
    //           name: "arp2"
    //         }
    //       );
  
    //  } catch (e) {
    //     alert  (e.message);
    //   }
  
    // }
} 