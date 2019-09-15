import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-accordion-search',
  templateUrl: './accordion-search.component.html',
  styleUrls: ['./accordion-search.component.css']
})
export class AccordionSearchComponent implements OnInit {

  public search: string;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/search.svg'));
  }

  ngOnInit() {
  }

}
