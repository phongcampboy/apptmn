import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController,App,AlertController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
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

  tmnapp:any="https://play.google.com/store/apps/details?id=com.tmncabletv.tmnapp";

  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public app:App,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    public toastCtrl: ToastController,
    public http: HttpClient,
    private market: Market,
    private storage: Storage) {

       this.platform.ready().then(()=>{       //Push Notifi ส่งข้อความ

        // Push msg
          var notificationOpenedCallback = function(jsonData: any) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        
        };
      
        window["plugins"].OneSignal
          .startInit("b6010585-1ca6-45eb-bae2-7a08bcf8490d","361687411034")   //เอามาจาก onsignal
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();

        //version
         this.appVersion.getVersionNumber().then((getVersionNumber)=>{
          this.versionNumber = getVersionNumber.toString(); 
          //console.log('Ver =',this.versionNumber); 
        })  

            let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_chk_version.php";
            let datapost = new FormData();
        
            datapost.append("chk_version", "versionNumber");
            //datapost.append("chk_version", "2.0");

        
            let data: Observable<any> = this.http.post(url, datapost);
            data.subscribe(async (call) => {
        
              //console.log(call);
              this.chk_version = call.new_version; //ตัวแปรนี้ this.chk_version รับค่าเวอร์ชั่นล่าสุด
              console.log('V',this.chk_version);
        
             if (call.status == 200) {
                
                //alert(call.new_version);
              if(this.versionNumber == this.chk_version){
                  console.log("Version= ",this.chk_version);
                }else{
                  this.checkversion();
                }

              } 
 
            });
          
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
      });

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
            } else {
              //this.openInAppStore('itms-apps://itunes.apple.com/app/310633997'); //call the openInAppStore
            /*   this.market.open(appId).then(response => {
                console.debug(response);
              
              }).catch(error => {
                console.warn(error);
              }); */
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
