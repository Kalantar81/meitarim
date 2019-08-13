import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

/** #start UI modules from angule materials */
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
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
import { MaterialMainComponent } from './views/material-main/material-main.component';
import { VerticalRangeSliderComponent } from './drafts/vertical-range-slider/vertical-range-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaticImageComponent } from './components/static-image/static-image.component';
import { DemoMaterialModule } from './material-module';
import { DialogDemoComponent } from './drafts/popup/dialog-demo/dialog-demo.component';
import { PopupComponent } from './drafts/popup/popup/popup.component';




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
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    // NoopAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatGridListModule,
    // MatIconModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    Ng5SliderModule
  ],
  entryComponents: [DialogDemoComponent, PopupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
