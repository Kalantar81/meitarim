import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-accordion-search',
  templateUrl: './accordion-search.component.html',
  styleUrls: ['./accordion-search.component.css']
})
export class AccordionSearchComponent implements OnInit {

  public search: number;
  public showSearchResults: boolean;
  public searchResultArray: Array<any>;

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/search.svg'));
  }

  ngOnInit() {
    this.showSearchResults = false;
  }

  public searchResults() {
    this.showSearchResults = true;
    this.searchResultArray = [
      {name: 'aaa', image: 'assets/pictures/tiger.jpg', description: 'some description'},
      {name: 'bbb', image: 'assets/pictures/leon.jpg', description: 'some description'},
      {name: 'ccc', image: 'assets/pictures/lemure.jpg', description: 'some description'}
    ];
  }

}
