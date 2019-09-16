import { Component, OnInit, ViewChild, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.css']
})
export class SelectAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('selectAreaDiv', {static: true})
  public selectAreaDiv: ElementRef<HTMLElement>;

  public x1 = 0;
  public y1 = 0;
  public x2 = 0;
  public y2 = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.selectAreaDiv.nativeElement.hidden = true;
  }

  ngAfterViewInit() {
    this.init();
  }

  public init() {
    // this.selectAreaDiv.nativeElement.onmousemove = this.onMouseMoveAngular.bind(this);
    // this.selectAreaDiv.nativeElement.onmousedown = this.onMouseDownAngular.bind(this);
    // this.selectAreaDiv.nativeElement.onmouseup = this.onMouseUpAngular.bind(this);
    this.selectAreaDiv.nativeElement.click = this.mouseClickAngular.bind(this);
    console.log('width: ' + window.innerWidth + ' height: ' + window.innerHeight);
  }

  public reCalc() {
      const startPointX = Math.min(this.x1, this.x2);
      const endPointX = Math.max(this.x1, this.x2);
      const startPointY = Math.min(this.y1, this.y2);
      const endPointY = Math.max(this.y1, this.y2);

      this.selectAreaDiv.nativeElement.style.left = startPointX + 'px';
      this.selectAreaDiv.nativeElement.style.top = startPointY + 'px';
      this.selectAreaDiv.nativeElement.style.width = endPointX - startPointX + 'px';
      this.selectAreaDiv.nativeElement.style.height = endPointY - startPointY + 'px';

      console.log('x1: ' + this.x1 + ' y1: ' + this.y1 + '---- x2: ' + this.x2 + ' y2: ' + this.y2);
  }

  public onMouseDownAngular(e) {
    this.selectAreaDiv.nativeElement.hidden = false;
    this.x1 = e.clientX;
    this.y1 = e.clientY;
    this.reCalc();
  }

   public onMouseMoveAngular(e) {
    this.x2 = e.clientX;
    this.y2 = e.clientY;
    this.reCalc();

    console.log('x1: ' + this.x1 + ' y1: ' + this.y1 + 'x2: ' + this.x2 + ' y2: ' + this.y2);
  }

  public mouseClickAngular() {
    // this.selectAreaDiv.nativeElement.style.background = '#006400';
    // this.selectAreaDiv.nativeElement.style.opacity = '0.3';
    this.selectAreaDiv.nativeElement.style.border = '2px solid white';
    this.init();
    alert('x2 = ' + this.x2);
  }

   public onMouseUpAngular(e) {
    this.selectAreaDiv.nativeElement.hidden = true;
  }

  public onMouseLeaveAngular() {
    this.selectAreaDiv.nativeElement.hidden = true;
  }

}

