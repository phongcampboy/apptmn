import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController,App,AlertController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { ToastController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Market } from '@ionic-native/market';
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
  img_it: any;
  chk_version:any;

  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public app:App,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public http: HttpClient,
    private market: Market,
    private storage: Storage) {

       this.platform.ready().then(()=>{ 
  
          // Push msg
           var notificationOpenedCallback = function(jsonData: any) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          
          };
        
             window["plugins"].OneSignal
            .startInit("b6010585-1ca6-45eb-bae2-7a08bcf8490d","361687411034")   //เอามาจาก onsignal
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
            

        if (this.platform.is("android")) {
        
            this.versionNumber = '2.7';

            let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_chk_version.php";
            let datapost = new FormData();
        
            datapost.append("chk_version", null);

            let data: Observable<any> = this.http.post(url, datapost);
            data.subscribe(async (call) => {
        
              //console.log(call);
              this.chk_version = call.new_version; //ตัวแปรนี้ this.chk_version รับค่าเวอร์ชั่นล่าสุด
              console.log('Version = ',this.chk_version);
        
              var chk_update = this.isNewerVersion(this.versionNumber,this.chk_version )
      
   
              console.log('chk_update=',chk_update);

              if(chk_update == true){

                this.checkversion();
                console.log("ต้องอัพเดท");

              }else if(chk_update == false){
                console.log("ไม่ต้องอัพเดท");
              } 
          
            });

        } else if(this.platform.is("ios")) {

          this.versionNumber = '2.7';
          let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_chk_ios.php";
            let datapost = new FormData();
        
            datapost.append("chk_version", null);
        
            let data: Observable<any> = this.http.post(url, datapost);
            data.subscribe(async (call) => {
        
              //console.log(call);
              this.chk_version = call.new_version; //ตัวแปรนี้ this.chk_version รับค่าเวอร์ชั่นล่าสุด
              //console.log('Version = ',this.chk_version);


              var chk_update = this.isNewerVersion(this.versionNumber,this.chk_version )

   
              //console.log('chk_update=',chk_update);

              if(chk_update == true){

                this.checkversion();
                console.log("ต้องอัพเดท");

              }else if(chk_update == false){
                console.log("ไม่ต้องอัพเดท");
              } 
      

 
            });
        }
          
      });//platform


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
              message: 'ยืนยันออกจากแอปหรือไม่?',
              buttons: [{
                text: 'ยกเลิก',
                role: 'cancel',
                handler: () => {
                  console.log('Application exit prevented!');
                }
              },{
                text: 'ยืนยัน',
                handler: () => {
                  this.platform.exitApp(); // Close this application
                }
              }]
            });
            alert.present();
        }
      });

  }

 isNewerVersion (oldVer, newVer) {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
      const a = ~~newParts[i] // parse int
      const b = ~~oldParts[i] // parse int
      if (a > b) return true
      if (a < b) return false
    }
    return false
  }

  checkversion(){

    const confirm = this.alertCtrl.create({
      title: 'ตรวจพบเวอร์ชั่นใหม่',
      message: 'กรุณากด Update เพื่อรับข้อมูลข่าวสารล่าสุด',
      buttons: [
        {
          text: 'อัพเดท',
          handler: () => {
            
            if (this.platform.is("android")) {
              this.market.open('com.tmncabletv.tmnapp');

            } else if(this.platform.is("ios")) {
              //this.openInAppStore('itms-apps://itunes.apple.com/app/310633997'); //call the openInAppStore
              this.market.open('id1550152353').then(response => {
                console.debug(response);
              
              }).catch(error => {
                console.warn(error);
              });
            }
          
            console.log('Update clicked');
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
           
            console.log('Cancle clicked');
          }
        }
      ]
    });
    confirm.present();
  
  }

  notificationOpenedCallback() {
    throw new Error('Method not implemented.');
  }
  
  logout() {
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
            message: 'ยืนยันออกจากระบบสมาชิกหรือไม่?',
            buttons: [{
              text: 'ยกเลิก',
              role: 'cancel',
              handler: () => {
                console.log('Application exit prevented!');
              
              }
            },{
              text: 'ยืนยัน',
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
        message: 'ยืนยันออกจากแอปหรือไม่?',
        buttons: [{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
          }
        },{
          text: 'ยืนยัน',
          handler: () => {
            this.platform.exitApp(); // Close this application
          }
        }]
      });
      alert.present();
  } 
}

}


