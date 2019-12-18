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
import { AccordionEditModeComponent } from './components/menu/accordionBodyComponents/accordion-edit-mode/accordion-edit-mode.component';
import { MenuComponent } from './components/menu/menu.component';
import { IconsDemoComponent } from './drafts/icons-demo/icons-demo.component';
import { TextDesignComponent } from './drafts/text-design/text-design.component';
import { TreeDemoComponent } from './drafts/tree-demo/tree-demo.component';
import { SimpleTreeComponent } from './drafts/simple-tree/simple-tree.component';
import { DivLayerComponent } from './drafts/div-layer/div-layer.component';
import { ScaleSliderComponent } from './drafts/scale-slider/scale-slider.component';
import { VerticalScaleSliderComponent } from './drafts/vertical-scale-slider/vertical-scale-slider.component';
import { VerticalScaleComponent } from './drafts/vertical-scale/vertical-scale.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/tree',
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
  },
  {
    path: 'editMode',
    component: AccordionEditModeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
   path: 'textDesign',
   component: TextDesignComponent,
  },
  {
    path: 'tree',
    component: TreeDemoComponent,
   },
  {
    path: 'simpleTree',
    component: SimpleTreeComponent,
  },
  {
    path: 'divLayer',
    component: DivLayerComponent,
   },
   {
    path: 'horizontalScaleSlider',
    component: ScaleSliderComponent,
   },
   {
    path: 'verticalScaleSlider',
    component: VerticalScaleSliderComponent,
   },
   {
    path: 'verticalScale',
    component: VerticalScaleComponent,
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
