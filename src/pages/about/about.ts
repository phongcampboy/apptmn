import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { InAppBrowser } from "@ionic-native/in-app-browser";
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

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

    let loading = this.loadingCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);

    //console.log("รูป",this.img_cable);

    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/img_net.php";
      
    let postdataset = new FormData();

    postdataset.append("Page","Net");

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe((call) => {
     
      if (call.status == 'Net') {

        this.img_net_tmn = call.net_tmn;
        this.img_s01 = call.s01;
        this.img_s02 = call.s02;
        this.img_s03 = call.s03;
        this.img_s04= call.s04;
   
        console.log("Call", call);
       
      }
      if(call.status==400){

        console.log("Call=Null");
      }
      
    });
  }
  contact() {
    this.iab.create('http://line.me/ti/p/~@tmn.pattaya','_system');
  }
}
