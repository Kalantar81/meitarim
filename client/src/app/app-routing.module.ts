import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { MaterialMainComponent } from './views/material-main/material-main.component';
import { VerticalRangeSliderComponent } from './drafts/vertical-range-slider/vertical-range-slider.component';
import { StaticImageComponent } from './components/static-image/static-image.component';
import { DialogDemoComponent } from './drafts/popup/dialog-demo/dialog-demo.component';
import { SelectAreaComponent } from './drafts/select-area/select-area.component';
import { CanvasComponent } from './drafts/canvas/canvas.component';
import { AccordionDemoComponent } from './drafts/accordion-demo/accordion-demo.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/indexMaterial',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'indexMaterial',
    component: MaterialMainComponent,
  },
  {
    path: 'verticalSlider',
    component: VerticalRangeSliderComponent,
  },
  {
    path: 'staticImage',
    component: StaticImageComponent,
  },
  {
    path: 'popupDemo',
    component: DialogDemoComponent,
  },
  {
    path: 'selectArea',
    component: SelectAreaComponent,
  },
  {
    path: 'canvas',
    component: CanvasComponent,
  },
  {
    path: 'accordionDemo',
    component: AccordionDemoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
