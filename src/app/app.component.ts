import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController,App,AlertController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  isLoggedIn: Boolean = false;
  user: any = null;
  MemberID:any = null;
  memberId: any= null;
  lastBack:any;
  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public app:App,
    private alertCtrl: AlertController,
    private storage: Storage) {

   platform.registerBackButtonAction(() => {

        let nav = app.getActiveNavs()[0];

          if (nav.canGoBack()){ //Can we go back?
            nav.pop();
          } else {
            const alert = this.alertCtrl.create({
              title: '!ออกจากแอปพลิเคชัน',
              message: 'คุณต้องการออกจาก แอปพลิเคชัน นี้หรือไม่?',
              buttons: [{
                text: 'ยกเลิก',
                role: 'cancel',
                handler: () => {
                  console.log('Application exit prevented!');
                }
              },{
                text: 'ตกลง',
                handler: () => {
                  this.platform.exitApp(); // Close this application
                }
              }]
            });
            alert.present();
        }
      });

  }


  async gotoPage() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'circles'
    });
    loading.present();

    await this.storage.remove('user');
    await this.storage.remove('MemberID');
    this.isLoggedIn = false;
    this.user = null;
    this.MemberID = null;
    this.nav.setRoot(TabsPage);
    loading.dismiss();
  }

  exitApp(){

    let nav = this.app.getActiveNavs()[0];

    if (nav.canGoBack()){ //Can we go back?
      nav.pop();
    } else {
      const alert = this.alertCtrl.create({
        title: '!ออกจากแอปพลิเคชัน',
        message: 'คุณต้องการออกจาก แอปพลิเคชัน นี้หรือไม่?',
        buttons: [{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
          }
        },{
          text: 'ตกลง',
          handler: () => {
            this.platform.exitApp(); // Close this application
          }
        }]
      });
      alert.present();
  } 
}

}
