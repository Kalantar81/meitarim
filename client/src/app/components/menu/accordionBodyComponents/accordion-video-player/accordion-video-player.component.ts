import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-accordion-video-player',
  templateUrl: './accordion-video-player.component.html',
  styleUrls: ['./accordion-video-player.component.css']
})
export class AccordionVideoPlayerComponent implements OnInit {
  public aaa: string;

  constructor(private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
    this._iconsInit();
  }
  ngOnInit() {
  }

  private _iconsInit(): void {
    /** stop icon */
    this._iconRegistry.addSvgIcon('stop', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/stop_filled.svg'));
    /** play icon */
    this._iconRegistry.addSvgIcon('play', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/play_filled.svg'));
    /** pause icon */
    this._iconRegistry.addSvgIcon('pause', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/pause_filled.svg'));
    /** fast_foward icon */
    this._iconRegistry.addSvgIcon('fast_foward', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/fast_foward_filled.svg'));
    /** fast_rewind icon */
    this._iconRegistry.addSvgIcon('fast_rewind', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/fast_rewind_filled.svg'));
  }

  public mouseClick() {
    alert('mouse clicked!');
  }

}
