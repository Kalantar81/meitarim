import { Component, OnInit } from '@angular/core';
import { UploadDialogComponent } from 'src/app/popboxes/upload-dialog/upload-dialog.component';
import { ChatService } from 'src/app/services/websocket-chat/chat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DataStoreService, FileData } from 'src/app/services/data-store/data-store.service';
import { AppMessagesService, FileMessage } from 'src/app/services/app-messages/app-messages.service';

@Component({
  selector: 'app-accordion-edit-mode',
  templateUrl: './accordion-edit-mode.component.html',
  styleUrls: ['./accordion-edit-mode.component.css']
})
export class AccordionEditModeComponent implements OnInit {

  aaa = false;
  // optimization, rerenders only files that change instead of the entire list of files
  filesTrackFn = (i, file) => file.id;

  constructor(private chatService: ChatService,
    private ngxSpinnerService:NgxSpinnerService,
    public dialog: MatDialog,
    private dataStoreService:DataStoreService,
    private appMessagesService:AppMessagesService
    ) {
    
  }

  ngOnInit() {
  }

  public mouseClick() {
    this.dataStoreService.addFile("TestFile")
    //alert(this.aaa);
  }

  sendDemoMsg() {
    var fileMessage : FileMessage = {
      file :{
        fileName: "stam"
      }
    }
    this.appMessagesService.sendFileDemoMessage(fileMessage);
  }

    /** #startDialogBox methods */
  public openDialog(): void {
    const dialogRef = this.dialog.open(
      UploadDialogComponent,
      {
        width: '450px',
        height: '380px',
        data: {result:undefined}
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.result=="OK") {
        console.log('The upload dialog was closed');
  
        //TODO
        //this.getFilesList();
        
      }

    });

  }

  public setFile(file: FileData){
    var fileMessage : FileMessage = {
      file :file
    }
    this.appMessagesService.sendFileMessage(fileMessage);
  }
}
