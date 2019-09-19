import { Injectable } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
@Injectable({
  providedIn: 'root'
})
export class DataStoreSettingsService{

  colorTableSpectrogram:ColorTableDataSource; //DOS section
  colorTableSpectrogramSection:ColorTableDataSource; //DOS section zoom
  colorTableMagnitogtram:ColorTableDataSource; //TDO sectiom
  colorTableMagnitogtramSection:ColorTableDataSource; //TDO section zoom
  colorTableSWH:ColorTableDataSource;//ARP video colors 
  colorTableTCS:ColorTableDataSource;//TCS video colors 

  constructor() {
    this.colorTableSpectrogram = new ColorTableDataSource(initialDataSpectrogram1);
    this.colorTableSpectrogramSection = new ColorTableDataSource(initialDataSpectrogram2);
    this.colorTableMagnitogtram = new ColorTableDataSource(initialDataSpectrogram3);
    this.colorTableMagnitogtramSection = new ColorTableDataSource(initialDataSpectrogram4);
    this.colorTableSWH = new ColorTableDataSource(initialDataSpectrogram5);
    this.colorTableTCS = new ColorTableDataSource(initialDataSpectrogram6);
  }

}
 
export class ColorTableDataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<ColorRow[]>([]);
  tableName :string = "Spectogram Color Table"
  minValue:number = -130;
  maxValue:number = 60;

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ColorRow[]> {
    return this.dataSubject;
  }

  disconnect() {}
}


export interface ColorRow {
  range: string;
  color?: string;
  comment?: string;
}

const initialDataSpectrogram1: ColorRow[] = [
  {range: '0', color: '#ff0000'},
  {range: '20', color: '#aa0000'},
  {range: '50', color: '#880000'},
  {range: '80', color: '#660000'},
  {range: '100', color: '#0000ff'}
];
const initialDataSpectrogram2: ColorRow[] = [
  {range: '0', color: '#ff0000'},
  {range: '50', color: '#ffff00'},
  {range: '100', color: '#0000ff'}
];
const initialDataSpectrogram3: ColorRow[] = [
  {range: '0', color: '#ff0000'},
  {range: '50', color: '#ffff00'},
  {range: '100', color: '#0000ff'}
];
const initialDataSpectrogram4: ColorRow[] = [
  {range: '0', color: '#ff0000'},
  {range: '50', color: '#ffff00'},
  {range: '100', color: '#0000ff'}
];
const initialDataSpectrogram5: ColorRow[] = [
  {range: '0', color: '#ff0000'},
  {range: '50', color: '#ffff00'},
  {range: '100', color: '#0000ff'}
];
const initialDataSpectrogram6: ColorRow[] = [
  {range: '0', color: '#ff0000'},
  {range: '50', color: '#ffff00'},
  {range: '100', color: '#0000ff'}
];

