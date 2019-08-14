import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/drafts/popup/dialog-demo/dialog-demo.component';
import { ISegmetParams } from 'src/app/components/static-image/static-image.component';

@Component({
  selector: 'app-segment-params-dialog',
  templateUrl: './segment-params-dialog.component.html',
  styleUrls: ['./segment-params-dialog.component.css']
})

export class SegmentParamsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SegmentParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISegmetParams
  ) {
    console.log(data);
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
