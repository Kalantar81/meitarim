import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-div-layer',
  templateUrl: './div-layer.component.html',
  styleUrls: ['./div-layer.component.css']
})
export class DivLayerComponent implements OnInit, AfterViewInit {

  @ViewChild('imageDiv', {static: true})
  public imageDiv: ElementRef<HTMLElement>;

  @ViewChild('selectAreaDiv', {static: true})
  public selectAreaDiv: ElementRef<HTMLElement>;

  @ViewChild('layerDiv', {static: true})
  public layerDiv: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.imageDiv.nativeElement.style.background = 'url("https://appharbor.com/assets/images/stackoverflow-logo.png") no-repeat center center';
    this.imageDiv.nativeElement.style.width = '100%';
    this.imageDiv.nativeElement.style.height = '100%';
    this.imageDiv.nativeElement.style.position = 'absolute';
    this.imageDiv.nativeElement.style.top = '0';
    this.imageDiv.nativeElement.style.left = '0';
    this.imageDiv.nativeElement.style.zIndex = '1';

    this.layerDiv.nativeElement.style.backgroundColor = 'blue';
    this.layerDiv.nativeElement.style.width = '100%';
    this.layerDiv.nativeElement.style.height = '100%';
    this.layerDiv.nativeElement.style.position = 'absolute';
    this.layerDiv.nativeElement.style.top = '0';
    this.layerDiv.nativeElement.style.left = '0';
    this.layerDiv.nativeElement.style.zIndex = '-1';

    this.selectAreaDiv.nativeElement.style.backgroundColor = 'black';
    this.selectAreaDiv.nativeElement.style.width = '30px';
    this.selectAreaDiv.nativeElement.style.height = '30px';
    this.layerDiv.nativeElement.style.position = 'absolute';
    this.selectAreaDiv.nativeElement.style.zIndex = '20';

  }

  public layerDivMain(): void {
    this.imageDiv.nativeElement.style.zIndex = '-1';
    this.layerDiv.nativeElement.style.zIndex = '1';
    this.selectAreaDiv.nativeElement.style.zIndex = '20';
  }

  public imageDivMain(): void {
    this.layerDiv.nativeElement.style.zIndex = '-1';
    this.imageDiv.nativeElement.style.zIndex = '1';
  }

}
