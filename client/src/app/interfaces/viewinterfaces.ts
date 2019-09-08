'use strict';

import { StaticImageComponent } from '../components/static-image/static-image.component';
import { CustomImgComponent } from '../components/custom-img/custom-img.component';
import { CustomVideoComponent } from '../components/custom-video/custom-video.component';


export interface IMainVeiw {
    dosImage: StaticImageComponent;
    arsImage: CustomImgComponent;
    artImage: CustomImgComponent;
    tdoImage: CustomImgComponent;
  
    arpVideo: CustomVideoComponent;
    tcsVideo: CustomVideoComponent;

}
