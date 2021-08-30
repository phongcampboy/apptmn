import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendlinePage } from './sendline';

@NgModule({
  declarations: [
    SendlinePage,
  ],
  imports: [
    IonicPageModule.forChild(SendlinePage),
  ],
})
export class SendlinePageModule {}
