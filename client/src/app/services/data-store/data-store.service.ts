import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators'
import { Subject } from "rxjs/Rx";
import { FileData } from 'src/app/interfaces/datainterfaces';





@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addFile, removeFile, etc)
  // - Create one BehaviorSubject per store entity, for example if you have FilesGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  // _files - a list of availible files
  private readonly _files = new BehaviorSubject<FileData[]>([]);


  public currentTimmeOfMedia :number;

  // Expose the observable$ part of the _files subject (read only stream)
  readonly files$ = this._files.asObservable();


  // we'll compose the files$ observable with map operator to create a stream of only completed files
  // tutorial function
  readonly selectedFile$ = this.files$.pipe(
    map(files => files.filter(file => (file.isSelected!=undefined)? file.isSelected:false  ))
  )

  // the getter will return the last value emitted in _files subject
  get files(): FileData[] {
    return this._files.getValue();
  }

  

  // assigning a value to this.files will push it onto the observable 
  // and down to all of its subsribers (ex: this.files = [])
  set files(val: FileData[]) {
    this._files.next(val);
  }

  public clearList() {
    this.files.splice(0,this.files.length);
  }
  
  public addFile(fileName: string) {
    // we assaign a new copy of files by adding a new file to it 
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.files = [
      ...this.files, 
      {id:""+ this.files.length + 1, fileName, isSelected: false}
    ];
  }

  public removeFile(id: string) {
    this.files = this.files.filter(file => file.id !== id);
  }

  setSelected(id: string, isSelected: boolean) {
    let file = this.files.find(file => file.id === id);

    if(file) {
      // we need to make a new copy of files array, and the file as well
      // remember, our state must always remain immutable
      // otherwise, on push change detection won't work, and won't update its view
      const index = this.files.indexOf(file);
      this.files[index] = {
        ...file,
        isSelected
      }

      this.files.forEach(f=>{
        if (f.id!=file.id){
          f.isSelected = false;
        }
      })

      this.files = [...this.files];
    }
  }
}


