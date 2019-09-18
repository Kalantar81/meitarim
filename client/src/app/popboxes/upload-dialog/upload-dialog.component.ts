import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { ChatService } from 'src/app/services/websocket-chat/chat.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

 
    @ViewChild ('fileUpload1', {static:  false}) fileUpload1: AngularFileUploaderComponent;


    resetVar:boolean = false;
    afuConfig = {
      multiple: false,
      formatsAllowed: ".xdat",
      maxSize: "900",
      uploadAPI:  {
        url:ChatService.UPLOAD_URL,

      },
      theme: "dragNDrop",
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Done !',
        afterUploadMsg_error: 'Upload Failed !'
      }
  };
  
  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  public DocUpload(event1){
    if (event1.response == "OK"){
      this.data.result = "OK";
    }else{
      this.data.result = "Failed";
      alert ("Error while upload: " + event1.response);
    }
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
