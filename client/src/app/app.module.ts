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
import { ChatService } from 'src/app/services/websocket-chat/chat.service';
import { WebsocketService } from "src/app/services/websocket/websocket.service"
import {ServerProxyService} from "src/app/services/server-proxy/server-proxy.service"
import { DataStoreService } from "src/app/services/data-store/data-store.service";
import { AppMessagesService } from "src/app/services/app-messages/app-messages.service";



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
import { AngularFileUploaderModule } from "angular-file-uploader";
import { IconsDemoComponent } from './drafts/icons-demo/icons-demo.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { InputDemoComponent } from './drafts/input-demo/input-demo.component';

import { CustomUploadComponent } from './components/custom-upload/custom-upload.component';
import {HttpClientModule, HttpRequest, HttpResponse} from '@angular/common/http';
import { SearchResultComponent } from './components/menu/accordionBodyComponents/accordion-search/search-result/search-result.component';
import { UploadDialogComponent } from './popboxes/upload-dialog/upload-dialog.component';
import { AccordionSettingsComponent } from './components/menu/accordionBodyComponents/accordion-settings/accordion-settings.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { ColorTableEditComponent } from './popboxes/color-table-edit/color-table-edit.component';
import { DataStoreSettingsService } from './services/data-store-settings/data-store-settings.service';
import { RendererComponent } from './drafts/renderer/renderer.component';
import { TextDesignComponent } from './drafts/text-design/text-design.component';
import { TreeDemoComponent } from './drafts/tree-demo/tree-demo.component';
import { CheckListDatabase } from './drafts/tree-demo/check-list-database.service';
import { SimpleTreeComponent } from './drafts/simple-tree/simple-tree.component';
import { DivLayerComponent } from './drafts/div-layer/div-layer.component';
import { ScaleSliderComponent } from './drafts/scale-slider/scale-slider.component';
import { VerticalScaleSliderComponent } from './drafts/vertical-scale-slider/vertical-scale-slider.component';
import { VerticalScaleComponent } from './drafts/vertical-scale/vertical-scale.component';

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
    AccordionSearchComponent,
    IconsDemoComponent,
    InputDemoComponent,
    CustomUploadComponent,
    UploadDialogComponent,
    SearchResultComponent,
    AccordionSettingsComponent,
    InlineEditComponent,
    ColorTableEditComponent,
    RendererComponent,
    TextDesignComponent,
    TreeDemoComponent,
    SimpleTreeComponent,
    DivLayerComponent,
    ScaleSliderComponent,
    VerticalScaleSliderComponent,
    VerticalScaleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SatPopoverModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    Ng5SliderModule,
    NgxSpinnerModule,
    AngularFileUploaderModule
  ],
  entryComponents: [
    DialogDemoComponent,
    PopupComponent,
    PopupWithInnerComponentComponent,
    SegmentParamsDialogComponent,
    SliderConfigPopboxComponent,
    UploadDialogComponent,
    ColorTableEditComponent
  ],
  providers: [
    ChatService,
    WebsocketService,
    ServerProxyService,
    DataStoreService,
    AppMessagesService,
    DataStoreSettingsService,
    CheckListDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
