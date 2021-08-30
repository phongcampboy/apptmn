import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the AppversionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appversion',
  templateUrl: 'appversion.html',
})
export class AppversionPage {

appName:string="";
packName:string="";
versionCode: string;
versionNumber: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appVersion: AppVersion,private platform:Platform) {

      this.platform.ready().then(()=>{

          this.appVersion.getAppName().then((appname)=>{
          this.appName=appname;
        })
        this.appVersion.getPackageName().then((packageName)=>{
          this.packName = packageName;
        })
        this.appVersion.getVersionCode().then((versionCode)=>{
          this.versionCode = versionCode.toString();
        })
        this.appVersion.getVersionNumber().then((getVersionNumber)=>{
          this.versionNumber = getVersionNumber.toString();
        }) 

      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppversionPage');
  }

}
