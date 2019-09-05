import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/drafts/popup/dialog-demo/dialog-demo.component';
import { SegmentParams } from 'src/app/components/static-image/static-image-interfaces';


@Component({
  selector: 'app-segment-params-dialog',
  templateUrl: './segment-params-dialog.component.html',
  styleUrls: ['./segment-params-dialog.component.css']
})

export class SegmentParamsDialogComponent implements OnInit {

  public date: string;
  public time: string;
  public color = 'accent';
  constructor(
    public dialogRef: MatDialogRef<SegmentParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SegmentParams
  ) {
    console.log(data);
  }

  ngOnInit() {
    let dd = String(this.data.date.getDate()).padStart(2, '0');
    let mm = String(this.data.date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.data.date.getFullYear();
    this.date = mm + '/' + dd + '/' + yyyy;

    const min = this.data.date.getUTCMinutes();
    const hours = this.data.date.getUTCHours();
    this.time = this.data.date.toLocaleTimeString();


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
