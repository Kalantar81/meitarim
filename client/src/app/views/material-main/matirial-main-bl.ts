import { IVeiwWindow } from 'src/app/interfaces/viewinterfaces';
import { Message, ChatService } from 'src/app/services/websocket-chat/chat.service';
import { SegmentParams } from 'src/app/components/static-image/static-image-interfaces';
import { DataStoreService } from 'src/app/services/data-store/data-store.service';
import { AppMessagesService } from 'src/app/services/app-messages/app-messages.service';
import { FileData, EnumPlayMediaCommand, PlayMediaMessage } from 'src/app/interfaces/datainterfaces';

export class ViewWindowBl  {

    private veiwWindow:IVeiwWindow;
    private chatService: ChatService;
    private itemsLoaded = 0;
    public static ITEMS_TO_LOAD:number =6;
    public static ITEMS_TO_LOAD_DYNAMIC_COMPONENTS:number =4;
    private itemsCount:number = ViewWindowBl.ITEMS_TO_LOAD;
    private currentDruation = 15;
    private currentWorkingFile:string;
    private dataStoreService:DataStoreService;
    //private filesArray:any[];



    public message : Message = {
      clientId: "client1",
      sourceFileName:"",
      picDimensions:{
        freq1:100,
        time1:101,
        freq2:300,
        time2:500
      }
    };

    constructor(mainView:IVeiwWindow,chatService: ChatService,
      dataStoreService:DataStoreService,
      appMessagesService:AppMessagesService){

      this.dataStoreService = dataStoreService;
      this.veiwWindow =   mainView;
      this.chatService = chatService;
      let handleMessage = this.handleMessageWs.bind(this);
      let handleError = this.onErrorWs.bind(this);
      chatService.messages.subscribe(handleMessage,handleError);
      appMessagesService.fileMessage.subscribe(this.onFileChanged.bind(this),
        this.onFileChangedError.bind(this));

      appMessagesService.fileDemoMessage.subscribe(this.setVideo.bind(this))
      appMessagesService.playMediaMessage.subscribe(this.onPlayMediaMessage.bind(this))
    }

   private onPlayMediaMessage(playMediaMessage:PlayMediaMessage){
        if (playMediaMessage.command == EnumPlayMediaCommand.Play){
         this.veiwWindow.startPlay();
        }
        if (playMediaMessage.command == EnumPlayMediaCommand.Stop){
          this.veiwWindow.stopUpdateTimer();
          this.veiwWindow.imgSliderChanged(0);
        }
        if (playMediaMessage.command == EnumPlayMediaCommand.Pause){
          this.veiwWindow.stopUpdateTimer();
        }

        if (playMediaMessage.command == EnumPlayMediaCommand.Rewind){
          this.veiwWindow.stopUpdateTimer();
          if ((this.veiwWindow.getCurrentTime()-1)>0){
            this.dataStoreService.currentTimmeOfMedia = this.veiwWindow.getCurrentTime()-1;
            this.veiwWindow.imgSliderChanged(this.dataStoreService.currentTimmeOfMedia);

          }else{
            this.dataStoreService.currentTimmeOfMedia = 0;
            this.veiwWindow.imgSliderChanged(0);
          }
        }
        if (playMediaMessage.command == EnumPlayMediaCommand.Forward){
          this.veiwWindow.stopUpdateTimer();
          if ((this.veiwWindow.getCurrentTime()+1)<this.veiwWindow.getCurrentDuration()){
            this.dataStoreService.currentTimmeOfMedia=this.veiwWindow.getCurrentTime()+1
            this.veiwWindow.imgSliderChanged(this.dataStoreService.currentTimmeOfMedia);
          }else{
            this.dataStoreService.currentTimmeOfMedia=this.veiwWindow.getCurrentDuration()
            this.veiwWindow.imgSliderChanged(this.dataStoreService.currentTimmeOfMedia);
          }
        }
    }

    private onFileChangedError(err:any){
        alert ("System Error: " + err);
    }

    private onFileChanged(file:FileData){
      //TO DO get Size for x and y2
      var newSegment:SegmentParams = {
        segmentName: "",
        createdBy: "",
        date: new Date(),
        startPointX: 0,
        endPointX: 200,
        startPointY: 0,
        endPointY: 500,
        firstTimeOpened: true,
        fileName:file.fileName

       }

       this.changeSelectionArea(newSegment);
    }

    private  createMessageBySelectedArea(selectedArea:SegmentParams):Message{
       var newMsg:Message = {
        clientId: "meitarim",
        sourceFileName:"",
        picDimensions:{
          freq1:selectedArea.startPointX,
          time1:selectedArea.startPointY,
          freq2:selectedArea.endPointX,
          time2:selectedArea.endPointY
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
      newMsg.sourceFileName = this.currentWorkingFile;
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
