import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController } from 'ionic-angular';
import { SendmailPage } from '../sendmail/sendmail';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {

  img_service :boolean = false;
  img_paytmn1 : any;
  img_pay1 : any;
  img_pay2 : any;
  img_pay3 : any;
  img_pay4: any;
  img_pay: any;
  img_QrPay:any;
  receipt_pay:any;

  constructor(public navCtrl: NavController, public http: HttpClient,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePage');

    let loading = this.loadingCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
   
    //console.log("รูป",this.img_cable);

    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/Api_App/img_service.php";
      
    let postdataset = new FormData();

    postdataset.append("Page","Service");

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe(async(call) => {
     
      if (await call.status == 'Service') {
        this.img_service = call;
        this.img_paytmn1 = call.paytmn1;
        this.img_pay1 = call.pay1;
        this.img_pay2 = call.pay2;
        this.img_pay3 = call.pay3;
        this.img_pay4 = call.pay4;
        this.img_pay = call.pay;
        this.img_QrPay = call.QrPay;
        this.receipt_pay= call.receipt_pay;
   
        console.log("Call", this.img_service);
       
      }
      else if(call.status==400){

        console.log("Call=Null");
      }
      
    });
  }

  paybill(){
    setTimeout(() => {
      this.navCtrl.push(SendmailPage);
    }, 300);
     
  }

}
