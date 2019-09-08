import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SegmentParamsDialogComponent } from '../segment-params-dialog/segment-params-dialog.component';

@Component({
  selector: 'app-slider-config-popbox',
  templateUrl: './slider-config-popbox.component.html',
  styleUrls: ['./slider-config-popbox.component.css']
})
export class SliderConfigPopboxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SegmentParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
