import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController,App,AlertController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { ToastController } from "ionic-angular";
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  isLoggedIn: Boolean;
  user: any = null;
  MemberID:any = null;
  memberId: any= null;
  Name:any=null;
  LastName:any=null;  
  chk_log:any=null;
  loadingController: any;
  versionCode: string;
  versionNumber: string;


  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public app:App,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    public toastCtrl: ToastController,
    private storage: Storage) {

       this.platform.ready().then(()=>{       //Push Notifi ส่งข้อความ

        // Push msg
        var notificationOpenedCallback = function(jsonData: any) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          //this.nav.push(CablePage);
        };
      
        window["plugins"].OneSignal
          .startInit("b6010585-1ca6-45eb-bae2-7a08bcf8490d","361687411034")   //เอามาจาก onsignal
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit(); 

          //version
          this.appVersion.getVersionCode().then((versionCode)=>{
          this.versionCode = versionCode.toString();
          })
          this.appVersion.getVersionNumber().then((getVersionNumber)=>{
            this.versionNumber = getVersionNumber.toString();
          }) 
      }) 

      this.memberId;
      this.storage.get("MemberID").then((val) => {
        this.memberId = val;
      });

   platform.registerBackButtonAction(() => {

        let nav = app.getActiveNavs()[0];

          if (nav.canGoBack()){ //Can we go back?
            nav.pop();
          } else {
            const alert = this.alertCtrl.create({
              title: '!ออกจากแอป',
              message: 'คุณต้องการออกจากแอปนี้หรือไม่?',
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
                  this.nav.push(HomePage);
                }
              }]
            });
            alert.present();
        }
      });

  }
 
  notificationOpenedCallback() {
    throw new Error('Method not implemented.');
  }
  
  async logout() {
    this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      console.log("Your ID", this.memberId);
  
    if(this.memberId == null){
            
      let toast = this.toastCtrl.create({
        message: "!!คุณยังไม่ได้เข้าสู่ระบบ",
        duration: 5000,
        position: "top",
        showCloseButton: true,
      });

      toast.present(toast);
      

    }else{
          
          const alert = this.alertCtrl.create({
            title: '!ออกจากระบบสมาชิก',
            message: 'คุณต้องการออกจากระบบนี้หรือไม่?',
            buttons: [{
              text: 'ยกเลิก',
              role: 'cancel',
              handler: () => {
                console.log('Application exit prevented!');
              
              }
            },{
              text: 'ตกลง',
              handler: () => {
                this.storage.remove('user');
                this.storage.remove('MemberID');
                this.storage.remove('Name');
                this.storage.remove('LastName');
                this.isLoggedIn = false;
                this.user = null;
                this.MemberID = null;
                this.Name = null;
                this.LastName = null;
                this.nav.setRoot(this.rootPage);  
              }
            }]
          });//const alert 
          alert.present();

    } //else
  });//this.storage.get("MemberID")
  
  }

  exitApp(){

    let nav = this.app.getActiveNavs()[0];

    if (nav.canGoBack()){ //Can we go back?
      nav.pop();
    } else {
      const alert = this.alertCtrl.create({
        title: '!ออกจากแอป',
        message: 'คุณต้องการออกจากแอปนี้หรือไม่?',
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
