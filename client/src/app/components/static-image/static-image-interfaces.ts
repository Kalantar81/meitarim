export interface IStaticImageOptions {
  height: number;
  width: number;
  src: string;
}

export interface IImageStyle {
  background: string;
  display?: string;
  width?: string;
  height?: string;
}

export class SegmentParams {
  segmentName: string;
  createdBy: string;
  date: Date;
  startPointX: number;
  endPointX: number;
  startPointY: number;
  endPointY: number;
  fileName?:string;
}
