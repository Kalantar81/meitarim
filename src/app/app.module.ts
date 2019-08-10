import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

/** #start UI modules from angule materials */
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material';

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



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MaterialMainComponent,
    LoginComponent,
    CustomVideoComponent,
    CustomImgComponent,
    CustomMediaHiveComponent,
    CustomImgBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,

    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
