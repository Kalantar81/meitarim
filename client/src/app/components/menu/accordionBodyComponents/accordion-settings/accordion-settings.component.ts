import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataStoreService } from 'src/app/services/data-store/data-store.service';
import { ColorTableEditComponent } from 'src/app/popboxes/color-table-edit/color-table-edit.component';
import { DataStoreSettingsService } from 'src/app/services/data-store-settings/data-store-settings.service';

@Component({
  selector: 'app-accordion-settings',
  templateUrl: './accordion-settings.component.html',
  styleUrls: ['./accordion-settings.component.css']
})
export class AccordionSettingsComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private dataStoreService:DataStoreService,
              private dataStoreSettingsService:DataStoreSettingsService ) { }

  ngOnInit() {
  }

  public openColorTable(tableType:String){
    let data1 = null;
    if (tableType=='DOS'){
      data1 = this.dataStoreSettingsService.colorTableSpectrogram;
    }
    if (tableType=='TDO'){
      data1 = this.dataStoreSettingsService.colorTableMagnitogtram;
    }
    if (tableType=='ARS'){
      data1 = this.dataStoreSettingsService.colorTableSpectrogramSection;
    }
    if (tableType=='ART'){
      data1 = this.dataStoreSettingsService.colorTableMagnitogtramSection;
    }
    if (tableType=='ARP'){
      data1 = this.dataStoreSettingsService.colorTableSWH;
    }
    if (tableType=='TCS'){
      data1 = this.dataStoreSettingsService.colorTableTCS;
    }
    
   
    const dialogRef = this.dialog.open(
      ColorTableEditComponent,
      {
        width: '500px',
        height: '480px',
        data: data1
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.result=="OK") {
        console.log('The upload dialog was closed');
        //TODO
        //this.getFilesList();
      }

    });
  
  }
}
