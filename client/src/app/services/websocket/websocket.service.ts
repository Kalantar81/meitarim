import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class WebsocketService {

  constructor() { }

  private subject: Rx.Subject<MessageEvent>;
  private connected$ = new Subject<any>();

  public connect(url:string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("WebsocketService successfully connected: " + url);
      this.subject.complete
      this.connected$.next(true);
    }
    return this.subject;
  }

  public connected(): Observable<any> {
    return this.connected$.asObservable();
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable:Observable<String> = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
      
        return ws.close.bind(ws);
      });
     
     

    //  observable.subscribe({
    //     next: x => console.log('got value ' + x),
    //     error: err => console.error('something wrong occurred: ' + err),
    //     complete: () => {
    //       console.log('done');
    //       this.subject = null;
    //     }
    //   });
    
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }else{
            //this.subject. .error("Web socket is not open! Try again");
            //observable.
            //alert ("Web socket is not open! Try again")
            this.subject = undefined;
            throw new Error("Web socket is not open");
        }
      },
      error: (err) => {
        this.subject.error(err);
      }
    };

    

    return Rx.Subject.create(observer, observable);
  }

}
