
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs/Rx';

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

export class ServerProxyService {
  constructor( private http: HttpClient) { }
    public  getData(url:string):Observable<any>{
      return this.http.get(url);
      //HttpClient.get()
    }
}
