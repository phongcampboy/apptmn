import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { InAppBrowser } from "@ionic-native/in-app-browser";
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  img_cctv :boolean = false;
  img_cctv01 : any;
  img_cctv1 : any;
  img_cctv2 : any;
  img_conn : any;

  constructor(public navCtrl: NavController,public http: HttpClient,private iab: InAppBrowser, public loadingCtrl: LoadingController) {

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CablePage');
    let loading = this.loadingCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 800);

    //console.log("รูป",this.img_cable);

    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/img_cctv.php";
      
    let postdataset = new FormData();

    postdataset.append("Page","Cctv");

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe((call) => {
     
      if (call.status == 'Cctv') {
        this.img_cctv = call;
        this.img_cctv01 = call.cctv01;
        this.img_cctv1 = call.cctv1;
        this.img_cctv2 = call.cctv2;
        this.img_conn = call.conn;
   
        console.log("Call", this.img_cctv);
       
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
