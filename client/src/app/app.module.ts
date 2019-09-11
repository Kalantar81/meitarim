import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

/** #start UI modules from angule materials */
import {MatIconModule, MatNativeDateModule} from '@angular/material';
/** #end UI modules from angule materials */

import { Ng5SliderModule } from 'ng5-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { CustomVideoComponent } from './components/custom-video/custom-video.component';
import { CustomImgComponent } from './components/custom-img/custom-img.component';
import { CustomMediaHiveComponent } from './components/custom-media-hive/custom-media-hive.component';
import { CustomImgBaseComponent } from './components/custom-img-base/custom-img-base.component';
import { ChatService } from 'src/app/services/chat/chat.service';
import { WebsocketService } from "src/app/services/websocket/websocket.service"

import { MaterialMainComponent } from './views/material-main/material-main.component';
import { VerticalRangeSliderComponent } from './drafts/vertical-range-slider/vertical-range-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaticImageComponent } from './components/static-image/static-image.component';
import { DemoMaterialModule } from './material-module';
import { DialogDemoComponent } from './drafts/popup/dialog-demo/dialog-demo.component';
import { PopupComponent } from './drafts/popup/popup/popup.component';
import { SegmentParamsDialogComponent } from './popboxes/segment-params-dialog/segment-params-dialog.component';
import { DemoForPopboxComponent } from './drafts/popup/demo-for-popbox/demo-for-popbox.component';
import { PopupWithInnerComponentComponent } from './drafts/popup/popup-with-inner-component/popup-with-inner-component.component';
import { SliderConfigPopboxComponent } from './popboxes/slider-config-popbox/slider-config-popbox.component';
import { SelectAreaComponent } from './drafts/select-area/select-area.component';
import { CanvasComponent } from './drafts/canvas/canvas.component';
import { AccordionDemoComponent } from './drafts/accordion-demo/accordion-demo.component';
import { MenuComponent } from './components/menu/menu.component';
import { AccordionEditModeComponent } from './components/menu/accordionBodyComponents/accordion-edit-mode/accordion-edit-mode.component';
import { AccordionVideoPlayerComponent } from './components/menu/accordionBodyComponents/accordion-video-player/accordion-video-player.component';
import { AccordionCalculationsComponent } from './components/menu/accordionBodyComponents/accordion-calculations/accordion-calculations.component';
import { AccordionSearchComponent } from './components/menu/accordionBodyComponents/accordion-search/accordion-search.component';

import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MaterialMainComponent,
    LoginComponent,
    CustomVideoComponent,
    CustomImgComponent,
    CustomMediaHiveComponent,
    CustomImgBaseComponent,
    VerticalRangeSliderComponent,
    StaticImageComponent,
    DialogDemoComponent,
    PopupComponent,
    SegmentParamsDialogComponent,
    DemoForPopboxComponent,
    PopupWithInnerComponentComponent,
    SliderConfigPopboxComponent,
    SelectAreaComponent,
    CanvasComponent,
    AccordionDemoComponent,
    AccordionEditModeComponent,
    MenuComponent,
    AccordionVideoPlayerComponent,
    AccordionCalculationsComponent,
    AccordionSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    DemoMaterialModule,
    MatNativeDateModule,
    Ng5SliderModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    DialogDemoComponent,
    PopupComponent,
    PopupWithInnerComponentComponent,
    SegmentParamsDialogComponent,
    SliderConfigPopboxComponent
  ],
  providers: [ChatService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
