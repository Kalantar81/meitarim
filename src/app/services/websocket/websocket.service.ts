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
      this.connected$.next(true);
    }
    return this.subject;
  }

  public connected(): Observable<any> {
    return this.connected$.asObservable();
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      })
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }else{
            alert ("Web socket is not open! (TODO)")
        }
      }
    }
    return Rx.Subject.create(observer, observable);
  }

}
