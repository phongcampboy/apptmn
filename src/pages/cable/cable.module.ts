import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CablePage } from './cable';

@NgModule({
  declarations: [
    CablePage,
  ],
  imports: [
    IonicPageModule.forChild(CablePage),
  ],
})
export class CablePageModule {}
