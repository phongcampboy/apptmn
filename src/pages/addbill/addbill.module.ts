import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbillPage } from './addbill';

@NgModule({
  declarations: [
    AddbillPage,
  ],
  imports: [
    IonicPageModule.forChild(AddbillPage),
  ],
})
export class AddbillPageModule {}
