import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShownewsPage } from './shownews';

@NgModule({
  declarations: [
    ShownewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShownewsPage),
  ],
})
export class ShownewsPageModule {}
