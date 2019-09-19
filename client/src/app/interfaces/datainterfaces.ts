'use strict';

export interface FileData {
  id?: string;
  fileName: string;
  isSelected?: boolean;
}

export interface FileMessage {
    file: FileData;
}
  
export enum EnumPlayMediaCommand{
  Stop='Stop',
  Play='Play',
  Pause='Pause',
  Rewind ='Rewind',
  Forward ='Forward'

}
export interface PlayMediaMessage {
    command: EnumPlayMediaCommand;
}