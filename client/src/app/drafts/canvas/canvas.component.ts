import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;

  public img = new Image();
  private ctx: CanvasRenderingContext2D;
  // public ctx = this.canvas.getContext('2d');
  public rect = {
    startX: null,
    startY: null,
    w: null,
    h: null
  };
  public drag = false;

  constructor(private elementRef:ElementRef) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // this.img.src = 'assets/pictures/graph1.jpg';
    // this.img.onload = () => {
    //   this.ctx.drawImage(this.img, 300, 750);
    // };
  }

  ngAfterViewInit() {
    this.init();
  }


  public init() {
    this.canvas.nativeElement.onmousemove = this.mouseMove.bind(this);
    this.canvas.nativeElement.onmousedown = this.mouseDown.bind(this);
    this.canvas.nativeElement.onmouseup = this.mouseUp.bind(this);
  }

  public mouseDown(e) {
    this.drag = true;
    this.rect.startX = e.pageX - this.canvas.nativeElement.offsetLeft;
    this.rect.startY = e.pageY - this.canvas.nativeElement.offsetTop;
  }

  public mouseUp() {
    this.drag = false;
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  public mouseMove(e) {
    if (this.drag) {
      this.rect.w = (e.pageX - this.canvas.nativeElement.offsetLeft) - this.rect.startX;
      this.rect.h = (e.pageY - this.canvas.nativeElement.offsetTop) - this.rect.startY ;
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      console.log( ' startX: ' + this.rect.startX + ' startY: ' + this.rect.startY + ' width: ' + this.rect.w + ' height: ' + this.rect.h);
      this.draw();
    }
  }

  public draw() {
    this.ctx.setLineDash([6]);
    this.ctx.strokeStyle = '#ffffff';
    // this.ctx.strokeStyle = '#000000';
    this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
  }
}
