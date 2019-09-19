import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorTableDataSource, ColorRow } from 'src/app/services/data-store-settings/data-store-settings.service';

@Component({
  selector: 'app-color-table-edit',
  templateUrl: './color-table-edit.component.html',
  styleUrls: ['./color-table-edit.component.css']
})
export class ColorTableEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ColorTableEditComponent>,
          @Inject(MAT_DIALOG_DATA) public data: ColorTableDataSource) {

      this.dataSource = data;
  }
  
  ngOnInit() {
  }

  displayedColumns = ['range', 'color'];
  dataSource = null; // new ColorsDataSource(initialData);


  update(el: ColorRow, color: string) {
    if (color == null) { return; }
    // copy and mutate
    const copy = this.dataSource.data().slice()
    el.color = color;
    this.dataSource.update(copy);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

