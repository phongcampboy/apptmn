import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  img_net :boolean = false;
  img_net_tmn : any;
  img_s01 : any;
  img_s02 : any;
  img_s03 : any;
  img_s04: any;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    private iab: InAppBrowser,
    public loadingCtrl: LoadingController
    ) 
    {

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CablePage');
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2500
    });
    loader.present()
    this.img_net = true;
    //console.log("รูป",this.img_cable);

    if(this.img_net == true){

      this.img_net_tmn = "https://chawtaichonburi.com/appdata/img/net/net-tmn.png";
      this.img_s01 = "https://chawtaichonburi.com/appdata/img/net/S01.png";
      this.img_s02 = "https://chawtaichonburi.com/appdata/img/net/S02.png";
      this.img_s03 = "https://chawtaichonburi.com/appdata/img/net/S03.png";
      this.img_s04 = "https://chawtaichonburi.com/appdata/img/net/S04.png";

    }
  }

  OpenUrl()
  {
  this.iab.create('http://www.tmncabletv.com/%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%B2', '_blank');

  }


}
