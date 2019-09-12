import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icons-demo',
  templateUrl: './icons-demo.component.html',
  styleUrls: ['./icons-demo.component.css']
})
export class IconsDemoComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'aaa',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/videoCamera.svg'));

  }

  ngOnInit() {
  }

}
