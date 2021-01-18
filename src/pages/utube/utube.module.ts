import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UtubePage } from './utube';

@NgModule({
  declarations: [
    UtubePage,
  ],
  imports: [
    IonicPageModule.forChild(UtubePage),
  ],
})
export class UtubePageModule {}
