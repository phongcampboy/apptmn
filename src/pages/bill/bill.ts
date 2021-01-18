import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
})
export class BillPage {
  dataitem: any;
  billcode: number;
  createdCode: number;
  memberId: any;
  url = 'http://chart.apis.google.com/chart?cht=qr&chs=100x100&chld=H|0&chl=';
  qrcode: any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
    let getdata = this.navParams.get('memID');
    this.loaddata(getdata);
  }

  loaddata(data) {
    
    let loading = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'circles'
    });
    loading.present();
      this.dataitem = data;
      this.memberId = data[0].MemberID;
      this.billcode = data[0].BillingCode;
      this.createdCode = this.billcode;
      this.qrcode = this.url+this.createdCode;
      loading.dismiss();
    console.log("Qrcode=", this.qrcode);
  }

}
