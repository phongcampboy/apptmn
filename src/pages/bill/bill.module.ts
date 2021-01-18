import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillPage } from './bill';
//import {NgxQRCodeModule} from 'ngx-qrcode2';

@NgModule({
  declarations: [
    BillPage,
   
  ],
  imports: [
    IonicPageModule.forChild(BillPage),
    //NgxQRCodeModule
  ],
})
export class BillPageModule {}
