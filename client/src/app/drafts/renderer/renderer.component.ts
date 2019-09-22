import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent implements OnInit {

  @ViewChild('abcd', {static: true})
  private abcd: ElementRef;

  // public li = this.renderer.createElement('li');
  // public text = this.renderer.createText('Click here to add li');

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onClick() {
    const li = this.renderer.createElement('li');
    const text = this.renderer.createText('Click here to add li');
    this.renderer.appendChild(li, text);
    this.renderer.appendChild(this.abcd.nativeElement, li);
  }

  removeClick() {
    this.renderer.removeChild(this.abcd.nativeElement, 'li');
  }

}
