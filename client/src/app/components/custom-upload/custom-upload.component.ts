import { Component,VERSION, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType} from '@angular/common/http';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-custom-upload',
  templateUrl: './custom-upload.component.html',
  styleUrls: ['./custom-upload.component.css']
})
export class CustomUploadComponent implements OnInit {

  ngOnInit() {
  }

  percentDone: number;
  uploadSuccess: boolean;

  constructor(
    private http: HttpClient,
    ) { }
    
  version = VERSION
  
  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    try{
      this.http.post(ChatService.UPLOAD_URL, formData)
      .subscribe(event => {  
        console.log('done')
      })
    }catch(ex){
      alert ("Error in upload:" + ex.message)
    }
  
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File){    
    try{
    this.http.post(ChatService.UPLOAD_URL, file)
      .subscribe(event => {  
        console.log('done')
      })
    } catch(ex){
      alert ("Error in upload:" + ex.message)
    }
  }
  
  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    try{
      this.http.post(ChatService.UPLOAD_URL, formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
          }
      });
    } catch(ex){
      alert ("Error in upload:" + ex.message)
    }
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){   
    try{ 
      this.http.post(ChatService.UPLOAD_URL, file, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
          }
      });
    } catch(ex){
      alert ("Error in upload:" + ex.message)
    }
  }
}
