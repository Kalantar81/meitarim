import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-popup-with-inner-component',
  templateUrl: './popup-with-inner-component.component.html',
  styleUrls: ['./popup-with-inner-component.component.css']
})
export class PopupWithInnerComponentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

}
