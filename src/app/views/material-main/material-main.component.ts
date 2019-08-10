import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-main',
  templateUrl: './material-main.component.html',
  styleUrls: ['./material-main.component.less']
})
export class MaterialMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public alert(): void {
    alert('This is an image button!');
  }

}
